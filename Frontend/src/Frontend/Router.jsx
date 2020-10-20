import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Iniciosesion from "./pages/iniciosesion";
import Registro from "./pages/registro";
import Inicio from "./pages/Inicio";
import Productos from './pages/productos'
import Factura from './pages/Factura'
import Clientes from "./pages/Clientes";
import Proveedores from "./components/RegistroProveedores";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Iniciosesion} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/Inicio" component={Inicio} />
        <Route exact path="/productos" component={Productos} />
        <Route exact path="/Factura" component={Factura} />
        <Route exact path="/Clientes" component={Clientes} />
        <Route exact path="/Proveedores" component={Proveedores} />
        
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
