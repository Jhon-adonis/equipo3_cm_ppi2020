'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('api located at /usuarios | /clientes | /proveedores | /facturas');
});

module.exports = router;
