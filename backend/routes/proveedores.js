'use strict';
const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/Proveedores.controller.js');
const auth = require('../middlewares/auth.js');

router.get(
	'/obtener-proveedores',
	auth.verificarToken,
	proveedoresController.obtenerVarios,
);
router.get(
	'/obtener-proveedor/:id',
	auth.verificarToken,
	proveedoresController.obtener,
);
router.post(
	'/agregar-proveedor',
	auth.verificarToken,
	proveedoresController.agregar,
);
router.patch(
	'/actualizar-empresa/:id',
	auth.verificarToken,
	proveedoresController.actualizarEmpresa,
);
router.patch(
	'/actualizar-nombre/:id',
	auth.verificarToken,
	proveedoresController.actualizarNombre,
);
router.patch(
	'/actualizar-correo/:id',
	auth.verificarToken,
	proveedoresController.actualizarCorreo,
);
router.patch(
	'/actualizar-celular/:id',
	auth.verificarToken,
	proveedoresController.actualizarCelular,
);
router.delete(
	'/eliminar-proveedor/:id',
	auth.verificarToken,
	proveedoresController.eliminarProveedor,
);

module.exports = router;
