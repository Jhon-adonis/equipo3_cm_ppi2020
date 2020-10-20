import React from "react";

import "../components/styles/insigniaNueva.css";
import Navbar from '../components/Navbar.jsx';
import { Link } from "react-router-dom";
import RegistroProveedores from "../components/RegistroProveedores ";
class Proveedores extends React.Component {
  state = {
    form: {
      email: "",
      password: ""
    }
  };
  handleChange = (e) => {
    const nextFormulario = this.state.form;
    nextFormulario[e.target.name] = e.target.value;
    this.setState({
      form: nextFormulario
    });
  };

  render() {
    return (
      <div className="container">
      <div> <Navbar/>
   

<nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>

        <div class="row mt-4">
          <div class="col-md-6 mx-auto d-flex justify-content-center mt-4"></div>

          <div className="container">
            <div className="row">
              <div className="col- mx-autol- mx-auto d-f d-flex justify-content-center mtex justify-content-center mt-44"></div>
              <div className="col-md-12 mx-autol-md-12 mx-auto d-flex flex-wrap align-midd d-flex flex-wrap align-middle pe p-6">
                <RegistroProveedores
                  onChange={this.handleChange}
                  formValues={this.state.form}
                />
              
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Proveedores;
