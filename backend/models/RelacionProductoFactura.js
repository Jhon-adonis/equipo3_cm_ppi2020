'use strict';
module.exports = (sequelize, DataTypes) => {
	const RelacionProductoFactura = sequelize.define(
		'relacion_productos_facturas',
		{
			cantidad_producto: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			indexes: [
				{
					fields: ['FacturaId'],
				},
			],
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
	);
	return RelacionProductoFactura;
};
