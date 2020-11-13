'use strict';
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/Clientes.controller.js');
const auth = require('../middlewares/auth.js');

router.get(
	'/obtener-clientes',
	auth.verificarToken,
	clientesController.obtenerVarios,
);
router.get(
	'/obtener-cliente/:id',
	auth.verificarToken,
	clientesController.obtener,
);
router.post(
	'/agregar-cliente',
	auth.verificarToken,
	clientesController.agregar,
);
router.patch(
	'/actualizar-empresa/:id',
	auth.verificarToken,
	clientesController.actualizarEmpresa,
);
router.patch(
	'/actualizar-nombre/:id',
	auth.verificarToken,
	clientesController.actualizarNombre,
);
router.patch(
	'/actualizar-correo/:id',
	auth.verificarToken,
	clientesController.actualizarCorreo,
);
router.patch(
	'/actualizar-celular/:id',
	auth.verificarToken,
	clientesController.actualizarCelular,
);
router.delete(
	'/eliminar-cliente/:id',
	auth.verificarToken,
	clientesController.eliminarCliente,
);

module.exports = router;
