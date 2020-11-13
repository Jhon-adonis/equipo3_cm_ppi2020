'use strict';
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/Productos.controller.js');
const auth = require('../middlewares/auth.js');

router.get(
	'/obtener-productos',
	auth.verificarToken,
	productosController.obtenerVarios,
);
router.get(
	'/obtener-producto/:id',
	auth.verificarToken,
	productosController.obtener,
);
router.post(
	'/agregar-producto',
	auth.verificarToken,
	productosController.agregar,
);
router.patch(
	'/actualizar-proveedor/:id',
	auth.verificarToken,
	productosController.actualizarProveedor,
);
router.patch(
	'/actualizar-nombre/:id',
	auth.verificarToken,
	productosController.actualizarNombre,
);
router.patch(
	'/actualizar-precio/:id',
	auth.verificarToken,
	productosController.actualizarPrecio,
);
router.patch(
	'/actualizar-cantidad/:id',
	auth.verificarToken,
	productosController.actualizarCantidad,
);
router.patch(
	'/actualizar-codigo/:id',
	auth.verificarToken,
	productosController.actualizarCodigo,
);
router.delete(
	'/eliminar-producto/:id',
	auth.verificarToken,
	productosController.eliminarProducto,
);

module.exports = router;
