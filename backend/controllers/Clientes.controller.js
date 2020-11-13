'use strict';
const db = require('../models/index.js');
const { Op } = require('sequelize');
const Cliente = db.cliente;
const controller = {};

controller.obtenerVarios = async (req, res) => {
	try {
		let clientes = await Cliente.findAll({
			where: {
				usuario_creador: req.usuario.id,
			},
		});
		res.status(200).json({ data: clientes });
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
		let cliente = await Cliente.findByPk(id);
		if (cliente === null) {
			res.status(404).json({
				statusError: `No existe un cliente con id ${id}`,
			});
		} else if (cliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			res.status(200).json({ data: cliente });
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
	const { empresa, nombre, correo, celular } = req.body;
	// Deconstrucción y Comprobación de la petición
	if (
		empresa === undefined ||
		nombre === undefined ||
		correo === undefined ||
		celular === undefined
	) {
		res.status(400).json({
			statusError:
				'Mala peticion, debe tener: empresa, nombre, correo, celular.',
		});
		return;
	}
	try {
		if (
			(await Cliente.findOne({
				where: {
					[Op.and]: [
						{ [Op.or]: [{ correo }, { celular }] },
						{ usuario_creador: req.usuario.id },
					],
				},
				attributes: ['usuario_creador'],
			})) !== null
		) {
			res.status(400).json({
				statusError: 'Ya tienes un cliente con ese correo o numero',
			});
			return;
		}
		//Good ending: Registrar el Cliente
		await Cliente.create({
			usuario_creador: req.usuario.id,
			empresa,
			nombre,
			correo,
			celular,
		});
		res.status(200).json({ statusText: 'Cliente registrado exitosamente' });
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

controller.actualizarEmpresa = async (req, res) => {
	const { empresa } = req.body;
	if (!empresa || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: empresa',
		});
		return;
	}

	try {
		let cliente = await Cliente.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (cliente === null) {
			res.status(404).json({
				statusError: `El cliente #${req.params.id} no existe!`,
			});
		}
		if (cliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Cliente.update({ empresa }, { where: { id: req.params.id } });
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
			statusError: 'Mala petición debe tener: Nombre',
		});
		return;
	}

	try {
		let cliente = await Cliente.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (cliente === null) {
			res.status(404).json({
				statusError: `El cliente #${req.params.id} no existe!`,
			});
		}
		if (cliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Cliente.update({ nombre }, { where: { id: req.params.id } });
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

controller.actualizarCorreo = async (req, res) => {
	const { correo } = req.body;
	if (!correo || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: Correo',
		});
		return;
	}
	if (
		(await Cliente.findOne({
			where: {
				[Op.and]: [{ correo }, { usuario_creador: req.usuario.id }],
			},
		})) !== null
	) {
		res.status(400).json({
			statusError: 'Ya tienes un cliente con ese correo',
		});
		return;
	}
	try {
		let cliente = await Cliente.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (cliente === null) {
			res.status(404).json({
				statusError: `El cliente #${req.params.id} no existe!`,
			});
		}
		if (cliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Cliente.update({ correo }, { where: { id: req.params.id } });
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
controller.actualizarCelular = async (req, res) => {
	const { celular } = req.body;
	if (!celular || !req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: Celular',
		});
		return;
	}
	if (
		(await Cliente.findOne({
			where: {
				[Op.and]: [{ celular }, { usuario_creador: req.usuario.id }],
			},
			attributes: ['usuario_creador'],
		})) !== null
	) {
		res.status(400).json({
			statusError: 'Ya tienes un cliente con ese celular',
		});
		return;
	}
	try {
		let cliente = await Cliente.findByPk(req.params.id, {
			attributes: ['usuario_creador'],
		});
		if (cliente === null) {
			res.status(404).json({
				statusError: `El cliente #${req.params.id} no existe!`,
			});
		}
		if (cliente.usuario_creador != req.usuario.id) {
			res.status(403).json({
				statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
			});
		} else {
			await Cliente.update({ celular }, { where: { id: req.params.id } });
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

controller.eliminarCliente = async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({
			statusError: 'Mala petición debe tener: Id en los parametros',
		});
		return;
	}
	let cliente = await Cliente.findByPk(req.params.id, {
		attributes: ['usuario_creador'],
	});
	if (cliente === null) {
		res.status(404).json({
			statusError: `El cliente #${req.params.id} no existe!`,
		});
		return;
	}
	if (cliente.usuario_creador != req.usuario.id) {
		res.status(403).json({
			statusError: `El cliente #${req.params.id} no le pertenece al usuario #${req.usuario.id}`,
		});
	} else {
		try {
			await Cliente.destroy({ where: { id: req.params.id } });
		} catch (error) {
			res.status(500).json({
				statusError: `Ocurrio un error en el servidor ${
					process.env.NODE_ENV === 'dev' ||
					process.env.NODE_ENV === undefined
						? ''
						: error.message
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
