import React from "react";
//import LogoHeader from "../images/Raster.png";
//<img src={LogoHeader} alt="" srcset="" />
import "../components/styles/insigniaNueva.css";
import RegistroFormulario from "../components/RegistroFormulario";
import { Link } from "react-router-dom";
class Registro extends React.Component {
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
      <div class="h-100 my-4">
        <div className="Navbar">
          <div className="container-fluid"></div>
        </div>

        <div class="row mt-4">
          <div class="col-md-6 mx-auto d-flex justify-content-center mt-4"></div>

          <div className="container">
            <div className="row">
              <div className="col- mx-autol- mx-auto d-f d-flex justify-content-center mtex justify-content-center mt-44"></div>
              <div className="col-md-12 mx-autol-md-12 mx-auto d-flex flex-wrap align-midd d-flex flex-wrap align-middle pe p-6">
                <RegistroFormulario
                  onChange={this.handleChange}
                  formValues={this.state.form}
                />
                 <p className="text-dark justify-content-center">
                 <Link to="/">
              Iniciar Sesión 
            </Link>
            </p>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Registro;
