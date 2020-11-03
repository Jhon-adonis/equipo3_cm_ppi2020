import React from 'react';
import BarraNavegacion from '../components/BarraNavegacion';
import Clientes from '../assets/Clientes.png';
import Facturas from '../assets/Facturas.png';
import Productos from '../assets/Productos.png';
import Proveedores from '../assets/Proveedores.png';
import { useHistory } from 'react-router-dom';

function Inicio() {
	const history = useHistory();
	return (
		<>
			<BarraNavegacion title={'Accounting Record'} />
			<table className="table-borderless mx-auto mt-4">
				<tbody>
					<tr>
						<td>
							<button
								className="btn p-0 m-0"
								onClick={() => {
									history.push('/proveedores');
								}}
							>
								<figure className="figure m-4">
									<img
										style={{ width: '32vmin' }}
										src={Proveedores}
										alt="Proveedores"
										className="d-inline-block align-top float-right rounded"
									/>
									<figcaption className="figure-caption font-weight-bold text-center ">
										Proveedores
									</figcaption>
								</figure>
							</button>
						</td>

						<td>
							<button
								className="btn p-0 m-0"
								onClick={() => {
									history.push('/clientes');
								}}
							>
								<figure className="figure m-4">
									<img
										style={{ width: '32vmin' }}
										src={Clientes}
										alt="Clientes"
										className="d-inline-block align-top float-right rounded"
									/>
									<figcaption className="figure-caption font-weight-bold text-center ">
										Clientes
									</figcaption>
								</figure>
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button
								className="btn p-0 m-0"
								onClick={() => {
									history.push('/productos');
								}}
							>
								<figure className="figure m-4">
									<img
										style={{ width: '32vmin' }}
										src={Productos}
										alt="Productos"
										className="d-inline-block align-top float-right rounded"
									/>
									<figcaption className="figure-caption font-weight-bold text-center ">
										Productos
									</figcaption>
								</figure>
							</button>
						</td>

						<td>
							<button
								className="btn p-0 m-0"
								onClick={() => {
									history.push('/facturas');
								}}
							>
								<figure className="figure m-4">
									<img
										style={{ width: '32vmin' }}
										src={Facturas}
										alt="Facturas"
										className="d-inline-block align-top float-right rounded"
									/>
									<figcaption className="figure-caption font-weight-bold text-center ">
										Facturas
									</figcaption>
								</figure>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default Inicio;
