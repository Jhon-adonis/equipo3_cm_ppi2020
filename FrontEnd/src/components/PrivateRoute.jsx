/**
 * ESTE ES UNO DE LOS ARCHIVOS QUE SE DEBE CAMBIAR
 * EN LA LINEA 16 COLUMNA 11 CAMBIAR LA VARIABLE DE AUTENTIFICACIÓN POR UNA REAL
 * ADEMAS SE DEBE AÑADIR AL PROTOTIPO UN "CERAR SESIÓN" Y LA FUNCIÓN RESPECTIVA
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
	const fakeAuth = {
		isAuthenticated: window.localStorage.getItem('auth') === 'true',
	};
	console.log(fakeAuth);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				fakeAuth.isAuthenticated === true ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/inicio',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
