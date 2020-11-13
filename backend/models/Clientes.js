'use strict';
module.exports = (sequelize, DataTypes) => {
	const Cliente = sequelize.define(
		'Clientes',
		{
			id: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			empresa: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			nombre: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			correo: {
				type: DataTypes.STRING(256),
				allowNull: false,
			},
			celular: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			usuario_creador: {
				type: DataTypes.INTEGER(8).UNSIGNED,
			},
		},
		{
			indexes: [
				{
					fields: ['id'],
				},
				{
					fields: ['usuario_creador'],
				},
				{
					fields: ['correo'],
				},
				{
					fields: ['celular'],
				},
			],
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
	);
	return Cliente;
};
