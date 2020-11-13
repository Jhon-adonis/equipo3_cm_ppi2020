/** Archivo de inicialización del backend, acá se instancia todo lo que se va a utilizar */
'use strict';
const NON_PROD_ENV =
	process.env.NODE_ENV === undefined
		? true
		: process.env.NODE_ENV.toLowerCase().indexOf('dev') !== -1;
if (NON_PROD_ENV) require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index.js');
const usuariosRouter = require('./routes/usuarios.js');
const proveedoresRouter = require('./routes/proveedores.js');
const clientesRouter = require('./routes/clientes.js');
const productosRouter = require('./routes/productos.js');
const facturasRouter = require('./routes/facturas.js');

const app = express();
const middlewares = require('./middlewares/catchParseError.js');

const db = require('./models/index.js');
db.sequelize
	.sync(/*{ force: true }*/)
	.then(() => {
		console.log('La base de datos se ha conectado con Exito');
	})
	.catch((e) => {
		console.error('La base de datos fallo con el siguiente error:', e);
		process.exit(1);
	});

app.set('NON_PROD_ENV', NON_PROD_ENV);
app.use(logger('dev'));
app.use(express.json());

app.use(middlewares.catchParseError);
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/proveedores', proveedoresRouter);
app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/facturas', facturasRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(
		`Backend corriendo en: http://localhost:${process.env.PORT || 3000}`,
	);
});

module.exports = app;
