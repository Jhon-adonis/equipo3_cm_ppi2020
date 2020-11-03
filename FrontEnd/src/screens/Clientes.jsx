import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraBusqueda from '../components/BarraBusqueda';
import Cliente from '../components/Cliente';
import ClienteFijado from '../components/ClienteFijado';
import { useHistory, useLocation } from 'react-router-dom';
import Plus from '../assets/Plus.svg';
import { obtenerClientes } from '../services/conexionServidor';

function Clientes() {
	const { state } = useLocation();
	const history = useHistory();

	const [clientes, setClientes] = useState(obtenerClientes());

	const [clienteFijado, fijarCliente] = useState(null);

	useEffect(() => {
		if (
			state?.selectMode === true &&
			clienteFijado !== null &&
			history !== undefined
		) {
			history.push('/crear-factura', {
				cliente: clienteFijado,
				productos: state.productos,
				nota: state.nota
			});
		}
	}, [state, clienteFijado, history]);

	return (
		<>
			<BarraNavegacion title={'Clientes'} />
			<div className="use-roboto">
				<BarraBusqueda data={clientes} selector={setClientes} />
				<div className="container overflow-auto">
					{clientes.map((p) => (
						<Cliente key={p.id} selector={fijarCliente} data={p} />
					))}
					<div className="adjust-scroll-for-bottom mb-3" />
				</div>
				{state?.selectMode === undefined && clienteFijado !== null && (
					<ClienteFijado
						deselector={() => fijarCliente(null)}
						data={clienteFijado}
					/>
				)}
				{state?.selectMode === undefined && (
					<div
						className="d-flex w-80 mx-auto bg-gris-claro sticky-bottom fixed-bottom font-weight-bold"
						style={{ height: '8vh' }}
					>
						<h5 className="text-white text-center my-2 ml-2">
							Agregar cliente
						</h5>
						<button
							style={{ width: '6vh', height: '6vh' }}
							className="btn shadow-lg rounded-circle bg-black text-white p-0 ml-auto mr-2 my-2"
							type="button"
							onClick={() => history.push('/crear-cliente')}
						>
							<img src={Plus} alt="Añadir" />
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Clientes;
