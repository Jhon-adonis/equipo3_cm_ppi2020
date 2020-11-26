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
				<PrivateRoute path="/principal" exact component={Principal} />

				<PrivateRoute component={Facturas} path="/facturas" exact/>
				<PrivateRoute component={Productos} path="/productos" exact/>
				<PrivateRoute component={Proveedores} path="/proveedores" exact/>
				<PrivateRoute component={Clientes} path="/clientes" exact/>
				<PrivateRoute component={CrearProducto} path="/crear-producto" exact/>
				<PrivateRoute component={CrearCliente} path="/crear-cliente" exact/>
				<PrivateRoute component={CrearFactura} path="/crear-factura" exact/>
				<PrivateRoute component={CrearProveedor} path="/crear-proveedor" exact/>

				<Route path="/" render={() => <h1>Error 404</h1>} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
