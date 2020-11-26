import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	obtenerToken,
	http_call,
	guardarUsuario,
} from '../services/conexionServidor';


const PrivateRoute = ({ path, exact, component }) => {
	const [cargando, setCargando] = useState(true);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		const abortController = new AbortController();
		const perfil = async () => {
			setCargando(true);
			const { err, res } = await http_call(
				'/usuarios/perfil',
				'GET',
				undefined,
				{ Authorization: obtenerToken() },
				abortController,
			);
			setResponse(res);
			setError(err);
			setCargando(false);
		};
		perfil();
		return () => abortController.abort();
	}, []);

	if (cargando) {
		return <h2>Cargando..</h2>;
	}
	if (error) {
		return <Redirect to="/inicio" />;
	}
	if (response) {
		guardarUsuario(response);
		return <Route path={path} exact={exact} component={component} />;
	}
	return <Redirect to="/inicio" />;
};

export default PrivateRoute;
