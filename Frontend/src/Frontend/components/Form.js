import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      idProducto: 0,
      nombre: "",
      cantidad: "",
      precio: ""
    };
    this.state = { idFactura: parseInt(Math.random() * 1000) };

    this.state = this.initialState;
  }

  /*
    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('api/factura')
          .then(response => response.json())
          .then(data => this.setState({groups: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/group/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
          this.setState({groups: updatedGroups});
        });
      }*/

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  FieldsValidation = () => {};

  render() {
    const { idProducto, nombre, cantidad, precio } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={this.handleChange}
        />
        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={cantidad}
          onChange={this.handleChange}
        />
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={precio}
          onChange={this.handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
    );
  }
}

export default Form;
