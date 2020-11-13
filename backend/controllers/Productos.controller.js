'use strict';
const db = require('../models/index.js');
const { Op } = require('sequelize');
const Producto = db.producto;
const Proveedor = db.proveedor;
const controller = {};

controller.obtenerVarios = async (req, res) => {
	try {
		let productos = await Producto.findAll({
			where: {
				usuario_creador: req.usuario.id,
			},
		});
		res.status(200).json({ data: productos });
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
		const producto = await Producto.findByPk(id);
		if (producto === null) {
			res.status(404).json({
				statusError: `No existe un producto con id ${id}`,
			});
		} else if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			const productoPlano = producto.toJSON();
			productoPlano.proveedor = (
				await Proveedor.findByPk(productoPlano.proveedor)
			).toJSON();
			res.status(200).json({ data: productoPlano });
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
	const { proveedor, nombre, precio, cantidad, codigo } = req.body;
	// Deconstrucción y Comprobación de la petición
	if (
		proveedor === undefined ||
		nombre === undefined ||
		precio === undefined ||
		cantidad === undefined ||
		codigo === undefined
	) {
		res.status(400).json({
			statusError:
				'Mala peticion, debe tener: proveedor, nombre, precio, cantidad, codigo.',
		});
		return;
	}
	if (isNaN(parseInt(cantidad))) {
		res.status(400).json({
			statusError: 'Mala petición la cantidad no es un numero',
		});
		return;
	}
	if (isNaN(parseFloat(precio))) {
		res.status(400).json({
			statusError: 'Mala petición el precio no es un numero',
		});
		return;
	}
	if (isNaN(parseInt(codigo))) {
		res.status(400).json({
			statusError: 'Mala petición el codigo no es un numero',
		});
		return;
	}
	try {
		if (
			(await Producto.findOne({
				where: {
					[Op.and]: [{ codigo }, { usuario_creador: req.usuario.id }],
				},
				attributes: ['id'],
			})) !== null
		) {
			res.status(400).json({
				statusError: 'Ya tienes un producto con ese codigo',
			});
			return;
		}
		//Good ending: Registrar el Producto
		const instanciaProveedor = await Proveedor.findByPk(proveedor, {
			attributes: ['id'],
		});
		if (instanciaProveedor === null) {
			res.status(404).json({
				statusError: `El proveedor con el id #${proveedor} ya no existe`,
			});
			return;
		}
		await Producto.create({
			usuario_creador: req.usuario.id,
			proveedor,
			nombre,
			precio,
			cantidad,
			codigo,
		});
		res.status(200).json({
			statusText: 'Producto registrado exitosamente',
		});
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.actualizarProveedor = async (req, res) => {
	const { proveedor } = req.body;
	if (!proveedor || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: proveedor',
		});
		return;
	}

	try {
		const instanciaProveedor = await Proveedor.findByPk(proveedor, {
			attributes: ['id'],
		});
		if (instanciaProveedor === null) {
			res.status(404).json({
				statusError: `El proveedor con el id #${proveedor} ya no existe`,
			});
			return;
		}
		let producto = await Producto.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (producto === null) {
			res.status(404).json({
				statusError: `El producto #${req.params.id} no existe!`,
			});
		}
		if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Producto.update(
				{ proveedor },
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

controller.actualizarNombre = async (req, res) => {
	const { nombre } = req.body;
	if (!nombre || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: proveedor',
		});
		return;
	}

	try {
		let producto = await Producto.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (producto === null) {
			res.status(404).json({
				statusError: `El producto #${req.params.id} no existe!`,
			});
		}
		if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Producto.update({ nombre }, { where: { id: req.params.id } });
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

controller.actualizarPrecio = async (req, res) => {
	const { precio } = req.body;
	if (!precio || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: proveedor',
		});
		return;
	}
	if (isNaN(parseFloat(precio))) {
		res.status(400).json({
			statusError: 'Mala petición el precio no es un numero',
		});
		return;
	}
	try {
		let producto = await Producto.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (producto === null) {
			res.status(404).json({
				statusError: `El producto #${req.params.id} no existe!`,
			});
		}
		if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Producto.update({ precio }, { where: { id: req.params.id } });
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
controller.actualizarCantidad = async (req, res) => {
	const { cantidad } = req.body;
	if (!cantidad || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: proveedor',
		});
		return;
	}
	if (isNaN(parseInt(cantidad))) {
		res.status(400).json({
			statusError: 'Mala petición la cantidad no es un numero',
		});
		return;
	}
	try {
		let producto = await Producto.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (producto === null) {
			res.status(404).json({
				statusError: `El producto #${req.params.id} no existe!`,
			});
			return;
		}
		if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Producto.update(
				{ cantidad },
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
controller.actualizarCodigo = async (req, res) => {
	const { codigo } = req.body;
	if (!codigo || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: codigo',
		});
		return;
	}
	if (isNaN(parseInt(codigo))) {
		res.status(400).json({
			statusError: 'Mala petición el codigo no es un numero',
		});
		return;
	}

	try {
		let producto = await Producto.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (producto === null) {
			res.status(404).json({
				statusError: `El producto #${req.params.id} no existe!`,
			});
		}
		if (producto.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			if (
				(await Producto.findOne({
					where: {
						[Op.and]: [
							{ codigo },
							{ usuario_creador: req.usuario.id },
						],
					},
					attributes: ['id'],
				})) !== null
			) {
				res.status(400).json({
					statusError: 'Ya tienes un producto con ese codigo',
				});
				return;
			}
			await Producto.update({ codigo }, { where: { id: req.params.id } });
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

controller.eliminarProducto = async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: Id en los parametros',
		});
		return;
	}
	let producto = await Producto.findByPk(req.params.id, {
		attributes: ['usuario_creador'],
	});
	if (producto === null) {
		res.status(404).json({
			statusError: `El producto #${req.params.id} no existe!`,
		});
	}
	if (producto.usuario_creador != req.usuario.id) {
		res.status(403).json({
			statusError: `El producto #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
		});
	} else {
		try {
			await Producto.destroy({ where: { id: req.params.id } });
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
