import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraBusqueda from '../components/BarraBusqueda';
import Producto from '../components/Producto';
import ProductoFijado from '../components/ProductoFijado';
import { useHistory, useLocation } from 'react-router-dom';
import Plus from '../assets/Plus.svg';
import { obtenerProductos } from '../services/conexionServidor';

function Productos() {
	const { state } = useLocation();
	const history = useHistory();

	const [productos, setProductos] = useState(obtenerProductos());
	const [productoFijado, fijarProducto] = useState(null);

	useEffect(() => {
		if (
			state?.selectMode === true &&
			productoFijado !== null &&
			history !== undefined
		) {
			history.push('/crear-factura', {
				productos: [productoFijado, ...state.productos],
				cliente: state.cliente,
			});
		}
	}, [state, productoFijado, history]);

	return (
		<>
			<BarraNavegacion
				title={`${
					state?.pushMode !== undefined ? 'Seleccionar' : ''
				}Productos`}
			/>
			<div className="use-roboto">
				<BarraBusqueda data={productos} selector={setProductos} />
				<div className="container overflow-auto">
					{productos.map((p) => (
						<Producto
							key={p.id}
							selector={fijarProducto}
							data={p}
						/>
					))}
					<div className="adjust-scroll-for-bottom mb-3" />
				</div>
				{state?.selectMode === undefined && productoFijado !== null && (
					<ProductoFijado
						deselector={() => fijarProducto(null)}
						data={productoFijado}
					/>
				)}
				{state?.selectMode === undefined && (
					<div
						className="d-flex w-80 mx-auto bg-gris-claro sticky-bottom fixed-bottom font-weight-bold"
						style={{ height: '8vh' }}
					>
						<h5 className="text-white text-center my-2 ml-2">
							Agregar producto
						</h5>
						<button
							style={{ width: '6vh', height: '6vh' }}
							className="btn shadow-lg rounded-circle bg-black text-white p-0 ml-auto mr-2 my-2"
							type="button"
							onClick={() => history.push('/crear-producto')}
						>
							<img src={Plus} alt="Añadir" />
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Productos;
