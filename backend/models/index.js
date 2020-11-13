'use strict';
const config = require('../config/db.config.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	logging:
	process.env.NODE_ENV === undefined || process.env.NODE_ENV.toLowerCase().indexOf('dev') !== -1
			? console.log
			: null,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
	define: { engine: 'InnoDB' },
});

const db = { sequelize };

db.usuario = require('./Usuarios.js')(db.sequelize, DataTypes);
db.cliente = require('./Clientes.js')(db.sequelize, DataTypes);
db.proveedor = require('./Proveedores.js')(db.sequelize, DataTypes);
db.producto = require('./Productos.js')(db.sequelize, DataTypes);
db.factura = require('./Facturas.js')(db.sequelize, DataTypes);
db.RelacionProductoFactura = require('./RelacionProductoFactura.js')(
	db.sequelize,
	DataTypes,
);

db.usuario.hasMany(db.cliente, {
	// Un usuario crea muchos clientes
	foreignKey: 'usuario_creador',
	onDelete: 'CASCADE',
});
db.usuario.hasMany(db.proveedor, {
	// Un usuario crea muchos proveedores
	foreignKey: 'usuario_creador',
	onDelete: 'CASCADE',
});
db.usuario.hasMany(db.producto, {
	// Un usuario crea muchos productos
	foreignKey: 'usuario_creador',
	onDelete: 'CASCADE',
});
db.usuario.hasMany(db.factura, {
	// Un usuario crea muchas facturas
	foreignKey: 'usuario_creador',
	onDelete: 'CASCADE',
});

db.producto.belongsTo(db.proveedor, {
	// Un producto tiene un proveedor
	foreignKey: 'proveedor',
	onDelete: 'CASCADE',
});

db.factura.belongsTo(db.cliente, {
	// Una factura tiene un cliente
	foreignKey: 'cliente',
	onDelete: 'CASCADE',
});

db.producto.belongsToMany(db.factura, { through: db.RelacionProductoFactura }); // Muchas facturas tienen muchos productos
db.factura.belongsToMany(db.producto, { through: db.RelacionProductoFactura }); // Muchas facturas tienen muchos productos
module.exports = db;
