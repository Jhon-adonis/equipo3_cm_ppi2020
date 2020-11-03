/**
 * Acá se juntan todas las pantallas para crear la App. Además se define la navegación publica o privada
 */

import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import Principal from './screens/Principal';
import React from 'react';
import history from './services/history';
import Productos from './screens/Productos';
import Proveedores from './screens/Proveedores';
import Clientes from './screens/Clientes';
import Facturas from './screens/Facturas';
import CrearProducto from './screens/CrearProducto';
import CrearCliente from './screens/CrearCliente';
import CrearFactura from './screens/CrearFactura';
import CrearProveedor from './screens/CrearProveedor';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<BrowserRouter history={history}>
			<Switch>
				<Route
					path="/"
					exact
					render={() => <Redirect to="/inicio" />}
				/>
				<Route path="/inicio" exact component={InicioSesion} />
				<Route path="/registro" exact component={Registro} />
				<Route path="/principal" exact component={Principal} />

				<PrivateRoute path="/facturas" exact>
					<Facturas />
				</PrivateRoute>
				<PrivateRoute path="/productos" exact>
					<Productos />
				</PrivateRoute>
				<PrivateRoute path="/proveedores" exact>
					<Proveedores />
				</PrivateRoute>
				<PrivateRoute path="/clientes" exact>
					<Clientes />
				</PrivateRoute>

				<PrivateRoute path="/crear-producto" exact>
					<CrearProducto />
				</PrivateRoute>
				<PrivateRoute path="/crear-cliente" exact>
					<CrearCliente />
				</PrivateRoute>
				<PrivateRoute path="/crear-factura" exact>
					<CrearFactura />
				</PrivateRoute>
				<PrivateRoute path="/crear-proveedor" exact>
					<CrearProveedor />
				</PrivateRoute>

				<Route path="/" render={() => <h1>Error 404</h1>} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
