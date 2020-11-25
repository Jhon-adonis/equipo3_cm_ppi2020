import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BarraNavegacion from '../components/BarraNavegacion';

function CrearProducto() {
	const history = useHistory();

	const { state } = useLocation();

	const [proveedor, setProveedor] = useState();
	const [nombreProducto, setNombreProducto] = useState();
	const [precio, setPrecio] = useState();
	const [cantidad, setCantidad] = useState();
	const [codigo, setCodigo] = useState();

	useEffect(() => {
		if (state === undefined) {
			return;
		} else {
			setProveedor(state?.proveedor === undefined ? '' : state.proveedor);
			setNombreProducto(
				state?.nombreProducto === undefined ? '' : state.nombreProducto,
			);
			setPrecio(state?.precio === undefined ? '' : state.precio);
			setCantidad(state?.cantidad === undefined ? '' : state.cantidad);
			setCodigo(state?.codigo === undefined ? '' : state.codigo);
		}
	}, [state]);

	return (
		<>
			<BarraNavegacion
				title={`${
					state?.id === undefined ? 'Añadir' : 'Actualizar'
				} Producto`}
			/>
			<div className="container mx-auto mt-4 px-4">
				<label htmlFor="proveedor" className="font-weight-bold m-0">
					Proveedor
				</label>
				<button
					type="button"
					id="proveedor"
					value={proveedor}
					onChange={(e) => setProveedor(e.target.value)}
					className="btn form-control formulario-input mb-4 text-left"
					onClick={() => {
						history.push('/proveedores', { selectMode: true });
					}}
				>
					{state?.proveedor ? state.proveedor.nombre : ''}
				</button>

				<label
					htmlFor="nombre_producto"
					className="font-weight-bold m-0"
				>
					Nombre del producto
				</label>
				<input
					type="text"
					id="nombre_producto"
					value={nombreProducto}
					onChange={(e) => setNombreProducto(e.target.value)}
					className="form-control formulario-input mb-4"
				/>

				<label htmlFor="precio" className="font-weight-bold m-0">
					Precio unidad
				</label>
				<input
					type="number"
					id="precio"
					value={precio}
					onChange={(e) => setPrecio(e.target.value)}
					className="form-control formulario-input mb-4"
				/>

				<label htmlFor="cantidad" className="font-weight-bold m-0">
					Cantidad
				</label>
				<input
					type="number"
					id="cantidad"
					value={cantidad}
					onChange={(e) => setCantidad(e.target.value)}
					className="form-control formulario-input mb-4"
				/>

				<label htmlFor="codigo" className="font-weight-bold m-0">
					Codigo
				</label>
				<input
					type="number"
					id="codigo"
					value={codigo}
					onChange={(e) => setCodigo(e.target.value)}
					className="form-control formulario-input mb-4"
				/>
				</div>
				<DescartarGuardar
					onDescartar={() => history.push('/proveedores')}
					onGuardar={() => alert('NO IMPLEMENTADO')}
				/>
				
			
		</>
	);
}

export default CrearProducto;
