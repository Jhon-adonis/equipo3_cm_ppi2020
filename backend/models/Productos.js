'use strict';
module.exports = (sequelize, DataTypes) => {
	const Producto = sequelize.define(
		'Productos',
		{
			id: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			proveedor: {
				type: DataTypes.INTEGER(8).UNSIGNED,
			},
			nombre: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			precio: {
				type: DataTypes.DECIMAL(15, 2),
				allowNull: false,
				defaultValue: 0,
			},
			cantidad: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
			codigo: {
				type: DataTypes.INTEGER(8),
				allowNull: false,
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
					unique: true,
					fields: ['usuario_creador', 'codigo'],
				},
			],
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
	);
	return Producto;
};
