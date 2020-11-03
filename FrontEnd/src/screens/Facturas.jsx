/**
 * Factura tiene propiedades:
 * #
 * fecha de creación
 * fecha de vencimiento
 * Nota
 * Cliente
 * Facturas[]
 *
 */

import React, { useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import BarraBusqueda from '../components/BarraBusqueda';
import Factura from '../components/Factura';
import FacturaFijada from '../components/FacturaFijada';
import { useHistory } from 'react-router-dom';
import { obtenerFacturas } from '../services/conexionServidor';
import Plus from '../assets/Plus.svg';

function Facturas() {
	const history = useHistory();

	const [facturas, setFacturas] = useState(obtenerFacturas());

	const [facturaFijado, fijarFactura] = useState(null);

	return (
		<>
			<BarraNavegacion title={'Facturas'} />
			<div className="use-roboto">
				<BarraBusqueda data={facturas} selector={setFacturas} />
				<div className="container overflow-auto">
					{facturas.map((p) => (
						<Factura key={p.id} selector={fijarFactura} data={p} />
					))}
					<div className="adjust-scroll-for-bottom mb-3" />
				</div>
				{facturaFijado !== null && (
					<FacturaFijada
						deselector={() => fijarFactura(null)}
						data={facturaFijado}
					/>
				)}
				<div
					className="d-flex w-80 mx-auto bg-gris-claro sticky-bottom fixed-bottom font-weight-bold"
					style={{ height: '8vh' }}
				>
					<h5 className="text-white text-center my-2 ml-2">
						Agregar factura
					</h5>
					<button
						style={{ width: '6vh', height: '6vh' }}
						className="btn shadow-lg rounded-circle bg-black text-white p-0 ml-auto mr-2 my-2"
						type="button"
						onClick={() => history.push('/crear-factura')}
					>
						<img src={Plus} alt="Añadir" />
					</button>
				</div>
			</div>
		</>
	);
}

export default Facturas;
