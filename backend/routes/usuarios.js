'use strict';
const express = require('express');

const router = express.Router({ mergeParams: true });
const usuarioController = require('../controllers/Usuarios.controller.js');
const auth = require('../middlewares/auth.js');

router.post('/registro', usuarioController.registro);
router.post('/iniciar', usuarioController.iniciar);
router.get('/perfil', auth.verificarToken, usuarioController.perfil);

router.patch(
	'/cambiar-nombre',
	auth.verificarToken,
	usuarioController.cambiarNombre,
);
router.patch(
	'/cambiar-correo',
	auth.verificarToken,
	usuarioController.cambiarCorreo,
);
router.patch(
	'/cambiar-contrasena',
	auth.verificarToken,
	usuarioController.cambiarContrasena,
);
router.delete(
	'/eliminar-usuario',
	auth.verificarToken,
	usuarioController.eliminarUsuario,
);

module.exports = router;
