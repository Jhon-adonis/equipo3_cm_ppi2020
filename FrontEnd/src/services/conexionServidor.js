const resToJson = async (res) => {
	const contentType = res.headers.get('content-type');
	if (contentType && contentType.indexOf('application/json') !== -1) {
		return await res.json();
	}
	return null;
};
export const http_call = async (
	url,
	method = 'get',
	body = {},
	headers = {},
	controller = new AbortController(),
) => {
	try {
		const options = {
			method: method.toUpperCase(),
			signal: controller.signal,
			headers: {
				...headers,
			},
		};
		if (
			typeof body === 'object' &&
			!(Object.keys(body).length === 0 && body.constructor === Object)
		) {
			options.body = JSON.stringify(body);
			options.headers['Content-Type'] = 'application/json';
		}
		const timeOutCheck = setTimeout(() => controller.abort(), 15 * 1000);
		const res = await fetch(
			'http://localhost:3000' + url,
			options,
		);
		clearTimeout(timeOutCheck);
		const json = await resToJson(res);
		if (res.status === 404)
			return {
				err: { statusError: 'El endpoint en el backend no existe' },
				res: json,
			};
		else if (res.status === 400)
			return {
				err: { statusError: 'Mala petición al Backend...' },
				res: json,
			};
		if (res.status === 401)
			return { err: { statusError: 'Unauthorized' }, res: json };
		else if (res.status >= 500)
			return { err: { statusError: 'Server Error' }, res: json };
		return {
			err: json === null ? { statusError: 'Bad response' } : null,
			res: json,
		};
	} catch (err) {
		return { err: { statusError: err }, res: null };
	} finally {
		controller.abort();
	}
};

export const guardarUsuario = (usuario) => {
	if (
		typeof usuario === 'object' &&
		!(Object.keys(usuario).length === 0 && usuario.constructor === Object)
	) {
		localStorage.setItem('usuario', JSON.stringify(usuario));
		return true;
	} else {
		return false;
	}
};

export const obtenerUsuario = () => {
	try {
		return JSON.parse(localStorage.getItem('usuario'));
	} catch (error) {
		return null;
	}
};

const guardarToken = (token) => {
	localStorage.setItem('token', token);
};

export const obtenerToken = () => {
	return localStorage.getItem('token');
};

const nonDeepObjDiff = (o1, o2) =>
	Object.keys(o2).reduce((diff, key) => {
		if (o1[key] === o2[key]) return diff;
		return {
			...diff,
			[key]: o2[key],
		};
	}, {});

// Esta es una funcion de nivel 1 para comprobación de objetos

export const compareObjects = (o1, o2) => {
	for (let p in o1) {
		if (o1.hasOwnProperty(p)) {
			if (o1[p] !== o2[p]) {
				return false;
			}
		}
	}
	for (let p in o2) {
		if (o2.hasOwnProperty(p)) {
			if (o1[p] !== o2[p]) {
				return false;
			}
		}
	}
	return true;
};

const arrIncludesObj = (a, el) => a.some((item) => compareObjects(item, el));

// Y he aquí un diferenciador simetrico de vectores profundo
const arrDiff = (a1, a2) => ({
	removed: a1.filter((x) => !arrIncludesObj(a2, x)),
	added: a2.filter((x) => !arrIncludesObj(a1, x)),
});

export const Registrar = (nombre, correo, contrasena) => {
	return http_call('/usuarios/registro', 'POST', {
		nombre_completo: nombre,
		correo,
		contrasena,
	});
};
export const IniciarSesion = async (correo, contrasena) => {
	const { err, res } = await http_call('/usuarios/iniciar', 'POST', {
		correo,
		contrasena,
	});
	if (res?.token) {
		guardarToken(res.token);
		return { err: null, res };
	} else {
		return { err, res };
	}
};
export const obtenerClientes = async () => {
	const { err, res } = await http_call(
		'/clientes/obtener-clientes',
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return [];
	else return res ? res.data : [];
};

export const obtenerCliente = async (id) => {
	const { err, res } = await http_call(
		`/clientes/obtener-cliente/${id}`,
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return null;
	else return res ? res.data : null;
};

export const actualizarClienteEmpresa = async (id, empresa) => {
	const { err } = await http_call(
		`/clientes/actualizar-empresa/${id}`,
		'PATCH',
		{ empresa },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad empresa del cliente ${id}`);
	}
};
export const actualizarClienteNombre = async (id, nombre) => {
	const { err } = await http_call(
		`/clientes/actualizar-nombre/${id}`,
		'PATCH',
		{ nombre },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad nombre del cliente ${id}`);
	}
};
export const actualizarClienteCelular = async (id, celular) => {
	const { err } = await http_call(
		`/clientes/actualizar-celular/${id}`,
		'PATCH',
		{ celular },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad celular del cliente ${id}`);
	}
};
export const actualizarClienteCorreo = async (id, correo) => {
	const { err } = await http_call(
		`/clientes/actualizar-correo/${id}`,
		'PATCH',
		{ correo },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad correo del cliente ${id}`);
	}
};

export const actualizarCliente = async (id, data) => {
	let cliente = {};
	let { err, res } = await obtenerCliente(id);
	if (err) return alert('Ocurrio un error');
	else cliente = res ? res.data : null;
	if (cliente === null) {
		return alert('Ocurrio un error');
	}

	let diferencias = nonDeepObjDiff(cliente, { ...data });

	if (diferencias.empresa) {
		await actualizarClienteEmpresa(id, data.empresa);
	}
	if (diferencias.nombre) {
		await actualizarClienteNombre(id, data.nombre);
	}
	if (diferencias.correo) {
		await actualizarClienteCorreo(id, data.correo);
	}
	if (diferencias.celular) {
		await actualizarClienteCelular(id, data.celular);
	}

<<<<<<< HEAD
	return http_call(
		'/clientes/agregar-cliente',
		'POST',
		{ ...data },
		{
			Authorization: obtenerToken(),
		},
	);
};
export const eliminarCliente = async (id) => {
	const { err } = await http_call(
		`/clientes/eliminar-cliente/${id}`,
		'DELETE',
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha eliminado el cliente con id ${id}`);
	}
};
export const crearCliente = async (data) => {
	const { err } = await http_call(
		`/clientes/agregar-cliente`,
		'POST',
		{ ...data },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se creo el cliente`);
	}
};

export const obtenerProveedores = async () => {
	const { err, res } = await http_call(
		'/proveedores/obtener-proveedores',
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return [];
	else return res ? res.data : [];
};

export const obtenerProveedor = async (id) => {
	const { err, res } = await http_call(
		`/proveedores/obtener-proveedor/${id}`,
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return null;
	else return res ? res.data : null;
};

export const actualizarProveedorEmpresa = async (id, empresa) => {
	const { err } = await http_call(
		`/proveedores/actualizar-empresa/${id}`,
		'PATCH',
		{ empresa },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad empresa del proveedor ${id}`);
	}
};
export const actualizarProveedorNombre = async (id, nombre) => {
	const { err } = await http_call(
		`/proveedores/actualizar-nombre/${id}`,
		'PATCH',
		{ nombre },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad nombre del proveedor ${id}`);
	}
};
export const actualizarProveedorCelular = async (id, celular) => {
	const { err } = await http_call(
		`/proveedores/actualizar-celular/${id}`,
		'PATCH',
		{ celular },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad celular del proveedor ${id}`);
	}
};
export const actualizarProveedorCorreo = async (id, correo) => {
	const { err } = await http_call(
		`/proveedores/actualizar-correo/${id}`,
		'PATCH',
		{ correo },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad correo del proveedor ${id}`);
	}
};

export const actualizarProveedor = async (id, data) => {
	let proveedor = {};
	let { err, res } = await obtenerProveedor(id);
	if (err) return alert('Ocurrio un error');
	else proveedor = res ? res.data : null;
	if (proveedor === null) {
		return alert('Ocurrio un error');
	}

	let diferencias = nonDeepObjDiff(proveedor, { ...data });

	if (diferencias.empresa) {
		await actualizarProveedorEmpresa(id, data.empresa);
	}
	if (diferencias.nombre) {
		await actualizarProveedorNombre(id, data.nombre);
	}
	if (diferencias.correo) {
		await actualizarProveedorCorreo(id, data.correo);
	}
	if (diferencias.celular) {
		await actualizarProveedorCelular(id, data.celular);
	}
};
export const eliminarProveedor = async (id) => {
	const { err } = await http_call(
		`/proveedores/eliminar-proveedor/${id}`,
		'DELETE',
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha eliminado el proveedor con id ${id}`);
	}
};
export const crearProveedor = async (data) => {
	const { err } = await http_call(
		`/proveedores/agregar-proveedor`,
		'POST',
		{ ...data },
		{ Authorization: obtenerToken() },
	);
	console.log(err)
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se creo el proveedor`);
	}
};

export const crearProducto = async (data) => {
	const { err } = await http_call(
		`/productos/agregar-producto`,
		'POST',
		{ ...data },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se creo el producto`);
	}
};

export const obtenerProductos =async  () => {
	const { err, res } = await http_call(
		'/productos/obtener-productos',
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return [];
	else return res ? res.data : [];
};
export const obtenerProducto = (id) => {
	const { err, res } = http_call(
		`/productos/obtener-producto/${id}`,
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return null;
	else return res ? res.data : null;
};


export const actualizarProductoProveedor = async (id, proveedor) => {
		const { err } = await http_call(
		`/productos/actualizar-proveedor/${id}`,
		'PATCH',
		{ proveedor },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad Proveedor del productos ${id}`);
	}
}
export const actualizarProductoNombre = async (id, nombre) => {
		const { err } = await http_call(
		`/productos/actualizar-nombre/${id}`,
		'PATCH',
		{ nombre },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad Nombre del productos ${id}`);
	}
}
export const actualizarProductoPrecio = async (id, precio) => {
		const { err } = await http_call(
		`/productos/actualizar-precio/${id}`,
		'PATCH',
		{ precio },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad Precio del productos ${id}`);
	}
}
export const actualizarProductoCantidad = async (id, cantidad) => {
		const { err } = await http_call(
		`/productos/actualizar-cantidad/${id}`,
		'PATCH',
		{ cantidad },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad Cantidad del productos ${id}`);
	}
}
export const actualizarProductoCodigo = async (id, codigo) => {
		const { err } = await http_call(
		`/productos/actualizar-codigo/${id}`,
		'PATCH',
		{ codigo },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad Codigo del productos ${id}`);
	}
}

export const actualizarProducto = async (id, data) => {
	let producto = {};
	let { err, res } = await obtenerCliente(id);
	if (err) return alert('Ocurrio un error');
	else producto = res ? res.data : null;
	if (producto === null) {
		return alert('Ocurrio un error');
	}

	let diferencias = nonDeepObjDiff(producto, { ...data });

	if (diferencias.proveedor) {
		await actualizarProductoProveedor(id, data.proveedor);
	}
	if (diferencias.nombre) {
		await actualizarProductoNombre(id, data.nombre);
	}
	if (diferencias.precio) {
		await actualizarProductoPrecio(id, data.precio);
	}
	if (diferencias.cantidad) {
		await actualizarProductoCantidad(id, data.cantidad);
	}
	if (diferencias.codigo) {
		await actualizarProductoCodigo(id, data.codigo);
	}
};


export const eliminarProducto = async (id) => {
	const { err } = await http_call(
		`/productos/eliminar-producto/${id}`,
		'DELETE',
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha eliminado el producto con id ${id}`);
	}
};
export const obtenerFacturas = async () => {
	const { err, res } = await http_call(
		'/facturas/obtener-facturas',
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return [];
	else return res ? res.data : [];
};
export const obtenerFactura = async (id) => {
	const { err, res } = await http_call(
		`/facturas/obtener-factura/${id}`,
		'GET',
		undefined,
		{ Authorization: obtenerToken() },
	);
	if (err) return null;
	else return res ? res.data : null;
};

export const actualizarFacturaAgregarProducto = async (id, id_producto) => {
	const { err } = await http_call(
		`/proveedores/agregar-producto/${id}`,
		'PATCH',
		{ id_producto },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha agregado el producto a la factura con #${id}`);
	}
};
export const actualizarFacturaRemoverProducto = async (id, id_producto) => {
	const { err } = await http_call(
		`/proveedores/remover-producto/${id}`,
		'PATCH',
		{ id_producto },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha removido el producto a la factura con #${id}`);
	}
};
export const actualizarFacturaCambiarProductoCantidad = async (id, id_producto, cantidad) => {
	const { err } = await http_call(
		`/proveedores/cambiar-cantidad-producto/${id}`,
		'PATCH',
		{ id_producto, cantidad },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha cambiado la cantidad del producto ${id_producto} de la factura con #${id}`);
	}
};

export const actualizarFacturaNumero = async (id, numero) => {
	const { err } = await http_call(
		`/facturas/actualizar-Numero/${id}`,
		'PATCH',
		{ numero },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad  Numero de la factura #${id}`);
	}
};
export const actualizarFacturaFechaVencimiento = async (
	id,
	fecha_vencimiento,
) => {
	const { err } = await http_call(
		`/facturas/actualizar-Fecha-vencimiento/${id}`,
		'PATCH',
		{ fecha_vencimiento },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(
			`Se ha actualizado la propiedad  FechaVencimiento de la factura #${id}`,
		);
	}
};
export const actualizarFacturaNota = async (id, nota) => {
	const { err } = await http_call(
		`/facturas/actualizar-Nota/${id}`,
		'PATCH',
		{ nota },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad  Nota de la factura #${id}`);
	}
};
export const actualizarFacturaCliente = async (id, cliente) => {
	const { err } = await http_call(
		`/facturas/actualizar-Cliente/${id}`,
		'PATCH',
		{ cliente },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha actualizado la propiedad  Cliente de la factura #${id}`);
	}
};

export const actualizarFactura = async (id, data) => {
	let factura = {};
	let { err, res } = await obtenerFactura(id);
	if (err) return alert('Ocurrio un error');
	else factura = res ? res.data : null;
	if (factura === null) {
		return alert('Ocurrio un error');
	}

	let diferencias = nonDeepObjDiff(factura, { ...data });

	if (diferencias.numero) {
		await actualizarFacturaNumero(id, data.numero);
	}
	if (diferencias.fecha_vencimiento) {
		await actualizarFacturaFechaVencimiento(id, data.fecha_vencimiento);
	}
	if (diferencias.nota) {
		await actualizarFacturaNota(id, data.nota);
	}
	if (diferencias.cliente) {
		await actualizarFacturaCliente(id, data.cliente);
	}
	let facturaTieneProductoConId = (id) => {
		(factura?.Productos ? factura.Productos : []).some((p) => p.id === id);
	};
	let mappedProductos = (factura?.Productos ? factura.Productos : []).map((p, i) => {
		return {
			id: p.id,
			cantidad: p.cantidad,
		};
	});
	let diferenciaDeProductos = arrDiff(mappedProductos,
		data?.productos ? data.productos : [],
	);
	diferenciaDeProductos.added.forEach(async (productoAgregado) => {
		if (facturaTieneProductoConId(productoAgregado.id)) {
			await actualizarFacturaCambiarProductoCantidad(
				id,
				productoAgregado.id,
				productoAgregado.cantidad,
			);
		} else {
			await actualizarFacturaAgregarProducto(id, productoAgregado.id);
		}
	});
	diferenciaDeProductos.removed.forEach(async (productoRemovido) => {
		await actualizarFacturaRemoverProducto(productoRemovido.id);
	});
};

export const eliminarFactura = async (id) => {
	const { err } = await http_call(
		`/facturas/eliminar-factura/${id}`,
		'DELETE',
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se ha eliminado la factura con id ${id}`);
	}
};
export const crearFactura = async (data) => {
	const { err } = await http_call(
		`/facturas/agregar-factura`,
		'POST',
		{ ...data },
		{ Authorization: obtenerToken() },
	);
	if (err) {
		alert('Ocurrio un error');
	} else {
		alert(`Se creo la factura`);
	}
=======
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
>>>>>>> bd02ad856f64309be39c791f25ecae716e4d233f
};
