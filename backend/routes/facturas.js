'use strict';
const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/Facturas.controller');
const auth = require('../middlewares/auth.js');

router.get(
	'/obtener-facturas',
	auth.verificarToken,
	facturasController.obtenerVarios,
);
router.get(
	'/obtener-factura/:id',
	auth.verificarToken,
	facturasController.obtener,
);
router.post(
	'/agregar-factura',
	auth.verificarToken,
	facturasController.agregar,
);
router.patch(
	'/actualizar-numero/:id',
	auth.verificarToken,
	facturasController.actualizarNumero,
);
router.patch(
	'/actualizar-fecha-vencimiento/:id',
	auth.verificarToken,
	facturasController.actualizarFechaVencimiento,
);
router.patch(
	'/actualizar-nota/:id',
	auth.verificarToken,
	facturasController.actualizarNota,
);
router.patch(
	'/cambiar-cliente/:id',
	auth.verificarToken,
	facturasController.actualizarCliente,
);
router.patch(
	'/agregar-producto/:id',
	auth.verificarToken,
	facturasController.agregarProducto,
);
router.patch(
	'/cambiar-cantidad-producto/:id',
	auth.verificarToken,
	facturasController.cambiarCantidadProducto,
);
router.patch(
	'/remover-producto/:id',
	auth.verificarToken,
	facturasController.removerProducto,
);
router.delete(
	'/eliminar-factura/:id',
	auth.verificarToken,
	facturasController.eliminarFactura,
);

module.exports = router;
