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

import Clientes from './Clientes.json';
import Facturas from './Facturas.json';
import Productos from './Productos.json';
import Proveedores from './Proveedores.json';

export const obtenerClientes = () => {
	return Clientes;
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
	return Facturas;
};
export const actualizarFactura = (id, data) => {
	alert('NO IMPLEMENTADO');
};
export const eliminarFactura = (id) => {
	alert('NO IMPLEMENTADO');
};
export const crearFactura = (data) => {
	alert('NO IMPLEMENTADO');
};

export const obtenerProductos = () => {
	return Productos;
};
export const actualizarProducto = (id, data) => {
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
