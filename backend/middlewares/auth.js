'use strict';
const auth = {};
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');
const Usuario = db.usuario;

auth.verificarToken = async (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(401).json({ statusError: 'No Token!' });
	}
	jwt.verify(token, process.env.SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ statusError: 'Unauthorized' });
		}
		const usuario = await Usuario.findByPk(decoded.id, {
			attributes: { exclude: ['contrasena'] },
		});
		if (usuario === null) {
			return res.status(401).json({ statusError: 'Unauthorized' });
		}
		req.usuario = usuario.toJSON();
		next();
	});
};

module.exports = auth;
