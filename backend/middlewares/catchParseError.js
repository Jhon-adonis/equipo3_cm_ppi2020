'use strict';

const middlewares = {};
middlewares.catchParseError = function (error, req, res, next) {
	const {} = req.body;
	if (error instanceof SyntaxError) {
		if (
			process.env.NODE_ENV === 'dev' ||
			process.env.NODE_ENV === undefined
		)
			console.error('Error en middlware catchParseError', error);
		res.status(400).json({
			statusError: 'El body de la petición es un JSON Malformado',
		});
	} else {
		next();
	}
};
module.exports = middlewares;
