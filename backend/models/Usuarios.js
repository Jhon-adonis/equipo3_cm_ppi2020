'use strict';
module.exports = (sequelize, DataTypes) => {
	const Usuario = sequelize.define(
		'Usuarios',
		{
			id: {
				type: DataTypes.INTEGER(8).UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			nombre_completo: {
				type: DataTypes.STRING(64),
			},
			correo: {
				type: DataTypes.STRING(256),
				unique: true,
			},
			contrasena: {
				type: DataTypes.CHAR(60),
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['correo'],
				},
				{
					unique: true,
					fields: ['id'],
				},
			],
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
	);
	return Usuario;
};
