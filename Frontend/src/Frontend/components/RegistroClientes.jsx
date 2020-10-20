import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

class RegistroClientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: "",
        password: ""
      },
      formErrors: {
        email: "",
        password: ""
      },
      formValidity: {
        email: false,
        password: false
      },
      isSubmitting: false
    };
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const Correo = name === "Correo";
    const Contraseña = name === "Contraseña";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : "Este campo es obligatorio";

    if (validity[name]) {
      if (Correo) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} este campo es obligatorio`;
      }
      if (Contraseña) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <div className="container">
        <div className="row mb-66">
          <div className="col-lg-12 text-center">
          
          </div>
        </div>
        <label>Empresa</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresar Empresa"
                  onChange={this.handleChange}
                  value={formValues.text}
                />
        <div className="row">
          <div className="col-lg-12  ">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresar Nombre"
                  onChange={this.handleChange}
                  value={formValues.email}
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresar correo"
                  onChange={this.handleChange}
                  value={formValues.password}
                />
                <label>Número</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresar Número"
                  onChange={this.handleChange}
                  value={formValues.text}
                />
                <div className="invalid-feedback">{formErrors.password}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RegistroClientes  />, rootElement);

export default RegistroClientes ;
