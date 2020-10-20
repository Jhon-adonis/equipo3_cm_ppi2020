import React, { Component } from "react";
import Form from "./Form";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Id Producto</th>
        <th>Nombre del cliente</th>
        <th>Nombre del producto</th>
        <th>Cantidad</th>
        <th>Precio unitario</th>
        <th>Total</th>
        <th>Eliminar</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    const total = parseInt(row.precio) * parseInt(row.cantidad);
    return (
      <tr key={index}>
        <td>{(row.idProducto += 1)}</td>
        <td>{row.nombre2}</td>
        <td>{row.nombre}</td>
        <td>{row.cantidad}</td>
        <td>{"$" + row.precio}</td>
        <td>{"$" + total}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Eliminar</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

/*
const BillHeader = () => {
  return (
    <thead>
      <tr>
        <th>Id Factura</th>
        <th>Subtotal</th>
        <th>IVA</th>
        <th>Total</th>
      </tr>
    </thead>
  );
};

const GenerateBill = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>             
                <td>{row.idProducto +=1}</td>
                <td>{row.nombre}</td>
                <td>{"$" + row.precio}</td>
                <td><button onClick={() => props.removeCharacter(index)}>Eliminar</button></td>
            </tr>
        );
    });
}
*/

class Table extends Component {
  render() {
    const { characterData, removeCharacter } = this.props;

    return (
      <div>
        <table>
          <TableHeader />
          <TableBody
            characterData={characterData}
            removeCharacter={removeCharacter}
          />
        </table>
      </div>
    );
  }
}

export default Table;
