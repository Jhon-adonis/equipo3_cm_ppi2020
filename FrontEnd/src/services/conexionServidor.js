/**
 * En este archivo se van a definir las operaciones para con el servidor
 * Sin embargo en esta versión de prueba no se van a poder crear, eliminar o editar datos.
 * Por lo cual, esto es solo de prueba y para mostrar la funcionalidad/fidelidad.
 *
 * EL OBJETIVO ES QUE SOLO TOQUES ESTE ARCHIVO. LOS DEMÁS SE ENTREGAN COMO-SON SIN
 * GARANTIAS DE MODIFICACIONESpoder crear, eliminar o editar datos.
 * Por lo cual, crearsolo de prueba y para mostrar la funcionalidad/fidelidad.
 *
 * EL OBJETIVO ES QUE SOLO TOQUES ESTE ARCHIVO. LOS D
 todo funciona 
 */

// import Clientes from './Clientes.json';
import Facturas from './Facturas.json';
import Productos from './Productos.json';
import Proveedores from './Proveedores.json';

const apiUrl = 'https://accounting-record-backend.herokuapp.com/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjA1Mjc5ODg2LCJleHAiOjIyMTAwNzk4ODZ9.fJL62Y14i8DZTXTR8w-Wm68dYYFM3a8XQ8rtnVOQ9UY';

export const obtenerClientes = () => {
  fetch(apiUrl + 'clientes/obtener-clientes', {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('This is your data', data);
      return data;
    });
};
export const actualizarCliente = (id, data) => {
  alert('NO IMPLEMENTADO');
};
export const eliminarCliente = (id) => {
  alert('NO IMPLEMENTADO');
};
export const crearCliente = (data) => {
  alert('NO IMPLEMENTADO');
};

export const obtenerFacturas = () => {
  fetch(apiUrl + 'clientes/obtener-clientes', {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('This is your data', data);
      return data;
    });
  return Facturas;
};
export const actualizarFactura = (id, data) => {
  alert('NO IMPLEMENTADO');
};
export const eliminarFactura = (id) => {
  alert('NO IMPLEMENTADO');
};
export const crearFactura = (data) => {
  fetch(apiUrl + 'facturas/agregar-factura', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('This is your data', data);
      return data;
    });
};

export const obtenerProductos = () => {
  return Productos;
};
export const actualizarProducto = (id, data) => {
	// PUT
  alert('NO IMPLEMENTADO');
};
export const eliminarProducto = (id) => {
  alert('NO IMPLEMENTADO');
};
export const crearProducto = (data) => {
  alert('NO IMPLEMENTADO');
};

export const obtenerProveedores = () => {
  return Proveedores;
};
export const actualizarProveedor = (id, data) => {
  alert('NO IMPLEMENTADO');
};
export const eliminarProveedor = (id) => {
  alert('crearMENTADO');
};
export const crearProveedor = (data) => {
  alert('NO IMPLEMENTADO');
};
