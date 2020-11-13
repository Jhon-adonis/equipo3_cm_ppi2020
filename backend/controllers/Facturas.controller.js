/* No se puede comprobar de una forma técnicamente
 * correcta la fecha, entonces si el cliente la
 * manda mal gg. No se la va a aceptar, por lo
 * tanto se debe usar algun parser de fechas en el
 * cliente
 */
'use strict';
const db = require('../models/index.js');
const { Op } = require('sequelize');
const Factura = db.factura;
const Cliente = db.cliente;
const Producto = db.producto;
const RelacionProductoFactura = db.RelacionProductoFactura;
const controller = {};

controller.obtenerVarios = async (req, res) => {
	try {
		const facturas = await Factura.findAll({
			where: {
				usuario_creador: req.usuario.id,
			},
		});
		res.status(200).json({ data: facturas });
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.obtener = async (req, res) => {
	const { id } = req.params;
	if (id === undefined) {
		res.status(400).json({
			statusError: 'No se paso el parametro id en la url',
		});
		return;
	}
	try {
		// Lil cleanup
		const factura = (
			await Factura.findByPk(id, {
				include: [Cliente, Producto],
			})
		).toJSON();
		for (let i = 0; i < factura.Productos.length; i++) {
			delete factura.Productos[i].relacion_productos_facturas;
		}
		//
		if (factura === null) {
			res.status(404).json({
				statusError: `No existe un factura con id ${id}`,
			});
		} else if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			res.status(200).json({ data: factura });
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.agregar = async (req, res) => {
	const { numero, fecha_vencimiento, nota, cliente, productos } = req.body;
	if (
		numero === undefined ||
		fecha_vencimiento === undefined ||
		nota === undefined ||
		cliente === undefined ||
		productos == undefined
	) {
		res.status(400).json({
			statusError:
				'Mala peticion, debe tener: numero, fecha_vencimiento, nota, cliente, productos.',
		});
		return;
	}

	if (isNaN(parseInt(numero))) {
		res.status(400).json({
			statusError: 'Mala peticion el "numero" no es un numero',
		});
		return;
	}
	if (isNaN(parseInt(cliente))) {
		res.status(400).json({
			statusError:
				'Mala peticion el "cliente" no es un entero ( referente a la id del cliente a añadir)',
		});
		return;
	}
	if (!Array.isArray(productos)) {
		res.status(400).json({
			statusError: 'Mala peticion productos no es una lista',
		});
		return;
	}
	if (
		!productos.every(
			(p) => Number.isInteger(p.id) && Number.isInteger(p.cantidad),
		)
	) {
		res.status(400).json({
			statusError:
				'Mala peticion productos debe ser una lista de objetos: {id: int, cantidad:int }; 0 < cantidad < producto.cantidad',
		});
		return;
	}

	try {
		const instanciaCliente = await Cliente.findByPk(cliente, {
			attributes: ['usuario_creador'],
		});
		if (instanciaCliente === null) {
			res.status(404).json({
				statusError: `El cliente #${instanciaCliente} no existe!`,
			});
			return;
		}
		if (instanciaCliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${instanciaCliente} no le pertenece al usuario #${req.usuario.id}`,
			});
			return;
		}
		if (
			(await Factura.findOne({
				where: {
					[Op.and]: [{ numero }, { usuario_creador: req.usuario.id }],
				},
				attributes: ['id'],
			})) !== null
		) {
			res.status(400).json({
				statusError: 'Ya tienes una factura con ese numero',
			});
			return;
		}
		//Remapear productos para luego añadirlos, si uno de ellos no existe retornar
		let instanciasProductos = [];
		if (productos.length > 0) {
			instanciasProductos = await Producto.findAll({
				where: {
					[Op.or]: productos.map((v) => {
						return {
							[Op.and]: [
								{ id: v.id },
								{ usuario_creador: req.usuario.id },
							],
						};
					}),
				},
				attributes: ['id'],
			});
		}

		const productosAInsertar = [];
		for (const producto of productos) {
			const instanciaProducto = instanciasProductos.find(
				(ip) => ip.id === producto.id,
			);
			if (instanciaProducto === undefined) {
				res.status(404).json({
					statusError: `El producto con id #${producto.id} no existe o no te pertenece!`,
				});
				return;
			}
			if (
				producto.cantidad <= 0 ||
				producto.cantidad > instanciaProducto.cantidad
			) {
				res.status(400).json({
					statusError: `La cantidad del producto #${producto.id} no cumple con la condicion 0 < ${producto.cantidad} < ${instanciaProducto.cantidad}!`,
				});
				return;
			}
			productosAInsertar.push({
				instanciaProducto,
				cantidad_producto: producto.cantidad,
			});
		}
		let nuevaFactura = await Factura.create({
			usuario_creador: req.usuario.id,
			numero,
			fecha_vencimiento,
			nota,
			cliente,
		});
		for (const productoAInsertar of productosAInsertar) {
			await nuevaFactura.addProducto(
				productoAInsertar.instanciaProducto,
				{
					through: {
						cantidad_producto: productoAInsertar.cantidad_producto,
					},
				},
			);
		}

		res.status(200).json({
			statusText: `Factura${
				productos.length === 0 ? ' vacia' : ''
			} registrada exitosamente`,
		});
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.actualizarNumero = async (req, res) => {
	const { numero } = req.body;
	if (!numero || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: numero',
		});
		return;
	}
	if (isNaN(parseInt(numero))) {
		res.status(400).json({
			statusError: 'Mala peticion el "numero" no es un entero',
		});
		return;
	}
	try {
		if (
			(await Factura.findOne({
				where: {
					[Op.and]: [{ numero }, { usuario_creador: req.usuario.id }],
				},
				attributes: ['id'],
			})) !== null
		) {
			res.status(400).json({
				statusError: 'Ya tienes una factura con ese numero',
			});
			return;
		}
		let factura = await Factura.findByPk(req.params.id);
		if (factura === null) {
			res.status(404).json({
				statusError: `La factura #${req.params.id} no existe!`,
			});
		}
		if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Factura.update({ numero }, { where: { id: req.params.id } });
			res.status(200).json({
				statusText: 'Se han actualizado los datos exitosamente',
			});
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.actualizarFechaVencimiento = async (req, res) => {
	const { fecha_vencimiento } = req.body;
	if (!fecha_vencimiento || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: fecha_vencimiento',
		});
		return;
	}

	try {
		let factura = await Factura.findByPk(req.params.id);
		if (factura === null) {
			res.status(404).json({
				statusError: `La factura #${req.params.id} no existe!`,
			});
		}
		if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Factura.update(
				{ fecha_vencimiento },
				{ where: { id: req.params.id } },
			);
			res.status(200).json({
				statusText: 'Se han actualizado los datos exitosamente',
			});
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.actualizarNota = async (req, res) => {
	const { nota } = req.body;
	if (!nota || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: nota',
		});
		return;
	}

	try {
		let factura = await Factura.findByPk(req.params.id);
		if (factura === null) {
			res.status(404).json({
				statusError: `La factura #${req.params.id} no existe!`,
			});
		}
		if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Factura.update({ nota }, { where: { id: req.params.id } });
			res.status(200).json({
				statusText: 'Se han actualizado los datos exitosamente',
			});
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.actualizarCliente = async (req, res) => {
	const { cliente } = req.body;
	if (!cliente || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: cliente',
		});
		return;
	}
	if (isNaN(parseInt(cliente))) {
		res.status(400).json({
			statusError:
				'Mala peticion el "cliente" no es un entero ( referente a la id del cliente a añadir)',
		});
		return;
	}
	try {
		const instanciaCliente = await Cliente.findByPk(cliente, {
			attributes: ['id'],
		});
		if (instanciaCliente === null) {
			res.status(404).json({
				statusError: `El cliente con el id #${cliente} ya no existe`,
			});
			return;
		}
		let factura = await Factura.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (factura === null) {
			res.status(404).json({
				statusError: `La factura #${req.params.id} no existe!`,
			});
		}
		if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Factura.update({ cliente }, { where: { id: req.params.id } });
			res.status(200).json({
				statusText: 'Se han actualizado los datos exitosamente',
			});
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.agregarProducto = async (req, res) => {
	const { id_producto, cantidad } = req.body;
	const { id } = req.params;
	if (
		id === undefined ||
		id_producto === undefined ||
		cantidad === undefined
	) {
		res.status(400).json({
			statusError:
				'No se paso el parametro id en la url, además la petición debe tener id_producto y cantidad',
		});
		return;
	}
	if (isNaN(parseInt(cantidad))) {
		res.status(400).json({
			statusError: 'Mala peticion la cantidad no es un entero',
		});
		return;
	}
	try {
		// Lil cleanup
		const factura = await Factura.findByPk(id, {
			attributes: ['usuario_creador', 'id'],
			include: [Producto],
		});
		//
		if (factura === null) {
			res.status(404).json({
				statusError: `No existe un factura con id ${id}`,
			});
		} else if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else if (factura.Productos.some((p) => p.id === id_producto)) {
			res.status(404).json({
				statusError: `La factura ya tiene un producto con id ${id}`,
			});
		} else {
			const producto = await Producto.findByPk(id_producto, {
				attributes: ['id', 'usuario_creador'],
			});
			if (producto === null) {
				res.status(404).json({
					statusError: `No existe un producto con id ${id}`,
				});
			} else if (producto.usuario_creador != req.usuario.id) {
				res.status(403).json({
					statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
				});
			} else {
				await factura.addProducto(producto, {
					through: { cantidad_producto: cantidad },
				});
				res.status(200).json({
					statusText: 'Se han actualizado los datos exitosamente',
				});
			}
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.cambiarCantidadProducto = async (req, res) => {
	const { id_producto, cantidad } = req.body;
	const { id } = req.params;
	if (
		id === undefined ||
		id_producto === undefined ||
		cantidad === undefined
	) {
		res.status(400).json({
			statusError:
				'No se paso el parametro id en la url, además el body debe contener id_producto y cantidad',
		});
		return;
	}
	if (isNaN(parseInt(numero))) {
		res.status(400).json({
			statusError: 'Mala peticion el "numero" no es un numero',
		});
		return;
	}
	try {
		// Lil cleanup
		const factura = await Factura.findByPk(id, {
			attributes: ['usuario_creador', 'id'],
			include: [Producto],
		});
		//
		if (factura === null) {
			res.status(404).json({
				statusError: `No existe un factura con id ${id}`,
			});
		} else if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else if (!factura.Productos.some((p) => p.id === id_producto)) {
			res.status(404).json({
				statusError: `La factura no tiene un producto con id ${id}`,
			});
		} else {
			const producto = await Producto.findByPk(id_producto, {
				attributes: ['id', 'usuario_creador'],
			});
			if (producto === null) {
				res.status(404).json({
					statusError: `No existe un producto con id ${id}`,
				});
			} else if (producto.usuario_creador != req.usuario.id) {
				res.status(403).json({
					statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
				});
			} else {
				await RelacionProductoFactura.update(
					{ cantidad_producto: cantidad },
					{
						where: {
							[Op.and]: [
								{ FacturaId: id },
								{ ProductoId: id_producto },
							],
						},
					},
				);
				res.status(200).json({
					statusText: 'Se han actualizado los datos exitosamente',
				});
			}
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.removerProducto = async (req, res) => {
	const { id_producto } = req.body;
	const { id } = req.params;
	if (id === undefined || id_producto === undefined) {
		res.status(400).json({
			statusError: 'No se paso el parametro id en la url',
		});
		return;
	}
	try {
		// Lil cleanup
		const factura = await Factura.findByPk(id, {
			attributes: ['usuario_creador', 'id'],
			include: [Producto],
		});
		//
		if (factura === null) {
			res.status(404).json({
				statusError: `No existe un factura con id ${id}`,
			});
		} else if (factura.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else if (!factura.Productos.some((p) => p.id === id_producto)) {
			res.status(404).json({
				statusError: `La factura no tiene un producto con id ${id}`,
			});
		} else {
			const producto = await Producto.findByPk(id_producto, {
				attributes: ['id', 'usuario_creador'],
			});
			if (producto === null) {
				res.status(404).json({
					statusError: `No existe un producto con id ${id}`,
				});
			} else if (producto.usuario_creador != req.usuario.id) {
				console.log(producto, req.usuario);
				res.status(403).json({
					statusError: `El producto #${id_producto} no le pertenece al usuario #${req.usuario.id}`,
				});
			} else {
				await factura.removeProducto(producto);
				res.status(200).json({
					statusText: 'Se han actualizado los datos exitosamente',
				});
			}
		}
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.eliminarFactura = async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: Id en los parametros',
		});
		return;
	}
	let factura = await Factura.findByPk(req.params.id);
	if (factura === null) {
		res.status(404).json({
			statusError: `La factura #${req.params.id} no existe!`,
		});
		return;
	}
	if (factura.usuario_creador != req.usuario.id) {
		res.status(403).json({
			statusError: `La factura #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
		});
	} else {
		try {
			await Factura.destroy({ where: { id: req.params.id } });
		} catch (error) {
			res.status(500).json({
				statusError: `Ocurrio un error en el servidor ${
					req.app.get('NON_PROD_ENV') ? error.message : ''
				}`,
			});
			return;
		}
		res.status(200).json({
			statusText: 'Se han actualizado los datos exitosamente',
		});
	}
};

module.exports = controller;
