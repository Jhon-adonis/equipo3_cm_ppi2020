'use strict';
const bcrypt = require('bcryptjs');
const db = require('../models/index.js');
const jwt = require('jsonwebtoken');
const Usuario = db.usuario;
const controller = {};

controller.registro = async (req, res) => {
	const { nombre_completo, correo, contrasena } = req.body;
	try {
		// Deconstrucción y Comprobación de la petición
		if (
			(nombre_completo === undefined) |
			(correo === undefined) |
			(contrasena === undefined)
		) {
			res.status(400).json({
				statusError:
					'Mala peticion, debe tener: nombre_completo, correo, contrasena.',
			});
			return;
		}

		// Comprobación de existencia de un usuario con mismos datos
		if (
			(await Usuario.findOne({
				where: { correo },
				attributes: ['id'],
			})) !== null
		) {
			res.status(400).json({
				statusError: 'Ya existe un usuario con ese correo',
			});
			return;
		}

		//Good ending: Registrar el usuario
		await Usuario.create({
			nombre_completo,
			correo,
			contrasena: await bcrypt.hash(contrasena, 10),
		});
		res.status(200).json({ statusText: 'Usuario registrado exitosamente' });
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};
controller.iniciar = async (req, res) => {
	const { correo, contrasena } = req.body;
	try {
		// Deconstrucción y Comprobación de la petición
		if ((correo === undefined) | (contrasena === undefined)) {
			res.status(400).json({
				statusError: 'Mala peticion, debe tener correo y contrasena.',
			});
			return;
		}

		// Comprobación de existencia de un usuario con mismos datos
		const usuarioDB = await Usuario.findOne({
			where: {
				correo,
			},
		});
		if (usuarioDB === null) {
			res.status(404).json({
				statusError: 'No existe un usuario con correo',
			});
		} else {
			if (
				(await bcrypt.compare(contrasena, usuarioDB.contrasena)) ===
				false
			) {
				res.status(401).json({ statusError: 'Contrasena Incorrecta' });
			} else {
				const token = jwt.sign(
					{ id: usuarioDB.id },
					process.env.SECRET,
					{
						expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 dias, 24 horas, 60 minutos, 60 segundos, 1000 milisegundos = Una semana
					},
				);
				const usuarioPlano = usuarioDB.toJSON();
				delete usuarioPlano.contrasena;
				res.status(200).json({ usuario: usuarioPlano, token: token });
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

controller.cambiarNombre = async (req, res) => {
	const { usuario } = req;
	const { contrasena, nombre_completo } = req.body;
	if (!nombre_completo || !contrasena) {
		res.status(400).json({
			statusError: `No se envio la propiedad contrasena o nombreUsuario`,
		});
		return;
	}
	if (!usuario) {
		res.status(400).json({
			statusError: 'No se puede cambiar un usuario que no existe',
		});
	} else {
		try {
			const instanciaUsuario = await Usuario.findByPk(usuario.id, {
				attributes: ['contrasena'],
			});
			if (!bcrypt.compare(contrasena, instanciaUsuario.contrasena)) {
				res.status(401).json({ statusText: 'Contrasena incorrecta' });
				return;
			}

			if (instanciaUsuario.nombre_completo == nombre_completo) {
				res.status(304).json({
					statusError:
						'La propiedad era la misma entonces no se cambio',
				});
			} else {
				await Usuario.update(
					{ nombre_completo },
					{ where: { id: req.usuario.id } },
				);

				res.status(200).json({
					statusText: 'Se han realizado los cambios con exito',
				});
			}
		} catch (error) {
			res.status(500).json({
				statusError: `Ocurrio un error en el servidor ${
					req.app.get('NON_PROD_ENV') ? error.message : ''
				}`,
			});
		}
	}
};
controller.cambiarCorreo = async (req, res) => {
	const { usuario } = req;
	const { contrasena, correo } = req.body;
	if (!correo || !contrasena) {
		res.status(400).json({
			statusError: `No se envio la propiedad contrasena o nombreUsuario`,
		});
		return;
	}
	if (!usuario) {
		res.status(400).json({
			statusError: 'No se puede cambiar un usuario que no existe',
		});
	} else {
		try {
			const instanciaUsuario = await Usuario.findByPk(usuario.id, {
				attributes: ['contrasena'],
			});
			if (!bcrypt.compare(contrasena, instanciaUsuario.contrasena)) {
				res.status(401).json({ statusText: 'Contrasena incorrecta' });
				return;
			}

			if (instanciaUsuario.correo == correo) {
				res.status(304).json({
					statusError:
						'La propiedad era la misma entonces no se cambio',
				});
			} else {
				await Usuario.update(
					{ correo },
					{ where: { id: req.usuario.id } },
				);

				res.status(200).json({
					statusText: 'Se han realizado los cambios con exito',
				});
			}
		} catch (error) {
			res.status(500).json({
				statusError: `Ocurrio un error en el servidor ${
					req.app.get('NON_PROD_ENV') ? error.message : ''
				}`,
			});
		}
	}
};
controller.cambiarContrasena = async (req, res) => {
	const { usuario } = req;
	const { contrasena, nuevaContrasena } = req.body;
	if (!contrasena | !nuevaContrasena) {
		res.status(400).json({
			statusError: `No se envio la propiedad contrasena o nuevaContrasena`,
		});
		return;
	}
	if (!usuario) {
		res.status(400).json({
			statusError: 'No se puede cambiar un usuario que no existe',
		});
	} else {
		try {
			const instanciaUsuario = await Usuario.findByPk(usuario.id, {
				attributes: ['contrasena'],
			});
			if (!bcrypt.compare(contrasena, instanciaUsuario.contrasena)) {
				res.status(401).json({ statusText: 'Contrasena incorrecta' });
				return;
			}

			await Usuario.update(
				{ contrasena: await bcrypt.hash(nuevaContrasena, 10) },
				{ where: { id: req.usuario.id } },
			);
			res.status(200).json({
				statusText: 'Se han realizado los cambios con exito',
			});
		} catch (error) {
			res.status(500).json({
				statusError: `Ocurrio un error en el servidor ${
					req.app.get('NON_PROD_ENV') ? error.message : ''
				}`,
			});
		}
	}
};

controller.perfil = async (req, res) => {
	res.status(200).json({ ...req.usuario });
};

controller.eliminarUsuario = async (req, res) => {
	try {
		await Usuario.destroy({ where: { id: req.usuario.id } });
		res.status(200).json({
			statusText: 'Se han realizado los cambios con exito',
		});
	} catch (error) {
		res.status(500).json({
			statusError: `Ocurrio un error en el servidor ${
				req.app.get('NON_PROD_ENV') ? error.message : ''
			}`,
		});
	}
};

module.exports = controller;
