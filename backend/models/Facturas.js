'use strict';
/**
 *
 * creado_en no es necesario pues sequelieze lo genera
 * automaticamente
 * No crear referencia para productos,
 * dejar que sequelieze lo haga
 */

module.exports = (sequelize, DataTypes) => {
	const Factura = sequelize.define(
		'Facturas',
		{
			id: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			numero: {
				type: DataTypes.INTEGER(8),
			},

			fecha_vencimiento: {
				type: DataTypes.DATEONLY,
			},
			nota: {
				type: DataTypes.STRING,
			},
			cliente: {
				type: DataTypes.INTEGER(8).UNSIGNED,
			},
			usuario_creador: {
				type: DataTypes.INTEGER(8).UNSIGNED,
			},
		},
		{
			indexes: [
				{
					fields: ['usuario_creador'],
				},
				{
					fields: ['id'],
				},
			],
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
	);
	return Factura;
};
