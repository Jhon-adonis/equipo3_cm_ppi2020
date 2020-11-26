import React, { useCallback, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Plus from '../assets/Plus.svg';
import BarraNavegacion from '../components/BarraNavegacion';
import DescartarGuardar from '../components/DescartarGuardar';
import ProductoFactura from '../components/ProductoFactura';
import { actualizarFactura, crearFactura } from '../services/conexionServidor';
import { numberFormatter } from '../services/utils';

function CrearFactura() {
	const { state } = useLocation();
	const history = useHistory();

	const [nombre, setNombre] = useState();
	const [fechaCreacion, setFechaCreacion] = useState();
	const [fechaVencimiento, setFechaVencimiento] = useState();
	const [nota, setNota] = useState();
	const [cliente, setCliente] = useState();

	useEffect(() => {
		if (state === undefined) {
			return;
		} else {
			setNombre(state?.nombre === undefined ? '' : state.nombre);
			setFechaCreacion(
				state?.fechaCreacion === undefined ? '' : state.fechaCreacion,
			);
			setFechaVencimiento(
				state?.fechaVencimiento === undefined
					? ''
					: state.fechaVencimiento,
			);
			setNota(state?.nota === undefined ? '' : state.nota);
			setCliente(state?.cliente === undefined ? '' : state.cliente);
		}
	}, [state]);

	const [productos] = useState(
		state?.productos === undefined ? [] : [...state.productos],
	);
	const [cantidadesProductos, setCantidadesProductos] = useState(
		[...Array(productos.length)].map((_, i) => 1),
	);

	const setCantidadPorProducto = useCallback(
		(cantidad, i) => {
			let copiaCantidades = [...cantidadesProductos];
			copiaCantidades[i] = cantidad;
			setCantidadesProductos(copiaCantidades);
		},
		[cantidadesProductos],
	);

	return (
		<>
			<BarraNavegacion
				title={`${
					state?.id === undefined ? 'Añadir' : 'Actualizar'
				} factura`}
			/>
			<div className="container h-100">
				<div className="row align-items-center h-100 pt-0 px-3">
					<div className="col mx-auto overflow-auto">
						<label
							htmlFor="nombre"
							className="font-weight-bold m-0"
						>
							No°
						</label>
						<input
							type="text"
							id="nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							className="form-control formulario-input w-25 mb-4"
						/>

						<div className="form-row justifiy-content-center">
							<div className="col-5">
								<label
									htmlFor="fecha_creacion"
									className="font-weight-bold m-0"
								>
									Fecha de creación
								</label>
								<input
									type="date"
									id="fecha_creacion"
									value={fechaCreacion}
									onChange={(e) =>
										setFechaCreacion(e.target.value)
									}
									className="form-control formulario-input mb-4 pl-1 pr-0"
								/>
							</div>
							<div className="col-2"></div>
							<div className="col-5 text-nowrap">
								<label
									htmlFor="fecha_vencimiento"
									className="font-weight-bold m-0 "
								>
									Fecha de vencimiento
								</label>
								<input
									type="date"
									id="fecha_vencimiento"
									value={fechaVencimiento}
									onChange={(e) =>
										setFechaVencimiento(e.target.value)
									}
									className="form-control formulario-input mb-4 pl-1 pr-0"
								/>
							</div>
						</div>

						<label htmlFor="nota" className="font-weight-bold m-0">
							Nota
						</label>
						<input
							type="text"
							id="nota"
							value={nota}
							onChange={(e) => setNota(e.target.value)}
							className="form-control formulario-input mb-4"
						/>

						<label
							htmlFor="cliente"
							className="font-weight-bold m-0"
						>
							Cliente
						</label>
						<button
							type="button"
							id="cliente"
							value={cliente}
							onChange={(e) => setCliente(e.target.value)}
							className="btn form-control formulario-input mb-4 text-left"
							onClick={() => {
								history.push('/clientes', {
									selectMode: true,
									productos: productos,
									cliente:
										state?.cliente === undefined
											? null
											: state.cliente,
									nota: nota,
								});
							}}
						>
							{state?.cliente ? state.cliente.nombre : ''}
						</button>

						<div
							className="d-flex w-80 mx-auto font-weight-bold"
							style={{ height: '8vh' }}
						>
							<h5 className="text-center my-2 ml-2">Productos</h5>
							<button
								style={{ width: '4vh', height: '4vh' }}
								className="btn shadow-lg rounded-circle bg-black text-white p-0 ml-2 mr-2 my-2"
								type="button"
								onClick={() => {
									history.push('/productos', {
										selectMode: true,
										productos: productos,
										cliente:
											state?.cliente === undefined
												? null
												: state.cliente,
										nota: nota,
									});
								}}
							>
								<img src={Plus} alt="Añadir" />
							</button>
						</div>
						{productos.map((producto, i) => (
							<ProductoFactura
								key={i}
								producto={producto}
								selectorCantidad={(cantidad) =>
									setCantidadPorProducto(cantidad, i)
								}
							/>
						))}
						<div className="">
							<hr
								className="bg-gris-oscuro w-100"
								style={{ borderWidth: '2px' }}
							/>
							<div className="row">
								<h5 className="col">TOTAL</h5>
								<h5 className="col">
									{numberFormatter(
										productos.reduce(
											(ac, val, i) =>
												ac +
												val.precio *
													cantidadesProductos[i],
											0,
										),
									)}
								</h5>
							</div>
							<div style={{ height: '5vh' }} />
						</div>
					</div>
					<DescartarGuardar
						onGuardar={() => {
							let mappedProductos = productos.map((p, i) => {
								return {
									id: p.id,
									cantidad: cantidadesProductos[i],
								};
							});
							if (state?.id === undefined)
								crearFactura({
									numero: nombre,
									fecha_vencimiento: fechaVencimiento,
									nota,
									cliente: cliente.id,
									productos: mappedProductos,
								});
							else
								actualizarFactura(state.id, {
									numero: nombre,
									fecha_vencimiento: fechaVencimiento,
									nota,
									cliente: cliente.id,
									productos: mappedProductos,
								});
						}}
						onDescartar={() => history.push('/facturas')}
					/>
				</div>
			</div>
		</>
	);
}

export default CrearFactura;
