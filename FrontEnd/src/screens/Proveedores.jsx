import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraBusqueda from '../components/BarraBusqueda';
import Proveedor from '../components/Proveedor';
import ProveedorFijado from '../components/ProveedorFijado';
import Plus from '../assets/Plus.svg';
import { obtenerProveedores } from '../services/conexionServidor';
import { useHistory, useLocation } from 'react-router-dom';

function Proveedores() {
	const { state } = useLocation();
	const history = useHistory();
	const [proveedores, setProveedores] = useState(obtenerProveedores());

	const [proveedorFijado, fijarProveedor] = useState(null);

	useEffect(() => {
		if (
			state?.selectMode === true &&
			proveedorFijado !== null &&
			history !== undefined
		) {
			history.push('/crear-producto', { proveedor: proveedorFijado });
		}
	}, [state, proveedorFijado, history]);

	return (
		<>
			<BarraNavegacion title={'Proveedores'} />
			<div className="use-roboto">
				<BarraBusqueda data={proveedores} selector={setProveedores} />
				<div className="container overflow-auto">
					{proveedores.map((p) => (
						<Proveedor
							key={p.id}
							selector={fijarProveedor}
							data={p}
						/>
					))}
					<div className="adjust-scroll-for-bottom mb-3" />
				</div>
				{state?.selectMode === undefined &&
					proveedorFijado !== null && (
						<ProveedorFijado
							deselector={() => fijarProveedor(null)}
							data={proveedorFijado}
						/>
					)}
				{state?.selectMode === undefined && (
					<div
						className="d-flex w-80 mx-auto bg-gris-claro sticky-bottom fixed-bottom font-weight-bold"
						style={{ height: '8vh' }}
					>
						<h5 className="text-white text-center my-2 ml-2">
							Agregar proveedor
						</h5>
						<button
							style={{ width: '6vh', height: '6vh' }}
							className="btn shadow-lg rounded-circle bg-black text-white p-0 ml-auto mr-2 my-2"
							type="button"
							onClick={() => {
								history.push('/crear-proveedor');
							}}
						>
							<img src={Plus} alt="Añadir" />
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Proveedores;
