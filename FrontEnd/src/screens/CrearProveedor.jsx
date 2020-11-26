import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DescartarGuardar from '../components/DescartarGuardar';
import User from '../assets/User.png';
import BarraNavegacion from '../components/BarraNavegacion';
import { actualizarProveedor, crearProveedor } from '../services/conexionServidor';

function CrearProveedor() {
	const { state } = useLocation();
	const history = useHistory();
	const [nombre, setNombre] = useState();
	const [empresa, setEmpresa] = useState();
	const [correo, setCorreo] = useState();
	const [celular, setCelular] = useState();
	useEffect(() => {
		if (state === undefined) {
			return;
		} else {
			setNombre(state?.nombre === undefined ? '' : state.nombre);
			setEmpresa(state?.empresa === undefined ? '' : state.empresa);
			setCorreo(state?.correo === undefined ? '' : state.correo);
			setCelular(state?.celular === undefined ? '' : state.celular);
		}
	}, [state]);
	return (
		<>
			<BarraNavegacion
				title={`${
					state?.id === undefined ? 'Añadir' : 'Actualizar'
				} Proveedor`}
			/>
			<div className="container h-100 py-4">
				<div className="col mx-auto">
					<img
						src={User}
						alt={'Proveedor Imagen'}
						className="rounded-circle mx-auto d-block my-4"
						style={{ width: '25vw', height: '25vw' }}
					/>
					<div className="form-group mt-4">
						<label
							htmlFor="nombre"
							className="font-weight-bold m-0"
						>
							Nombre
						</label>
						<input
							type="text"
							id="nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							className="form-control formulario-input mb-4"
						/>
						<label
							htmlFor="empresa"
							className="font-weight-bold m-0"
						>
							Empresa
						</label>
						<input
							type="text"
							id="empresa"
							value={empresa}
							onChange={(e) => setEmpresa(e.target.value)}
							className="form-control formulario-input mb-4"
						/>
						<label
							htmlFor="correo"
							className="font-weight-bold m-0"
						>
							Correo
						</label>
						<input
							type="email"
							id="correo"
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
							className="form-control formulario-input mb-4"
						/>
						<label
							htmlFor="celular"
							className="font-weight-bold m-0"
						>
							Celular
						</label>
						<input
							type="tel"
							id="celular"
							value={celular}
							onChange={(e) => setCelular(e.target.value)}
							className="form-control formulario-input mb-4"
						/>
					</div>
					<DescartarGuardar
						onDescartar={() => history.push('/proveedores')}
						onGuardar={() => {
							if (state?.id === undefined)
								crearProveedor({
									empresa,
									nombre,
									correo,
									celular,
								});
							else
								actualizarProveedor(state.id, {
									empresa,
									nombre,
									correo,
									celular,
								});
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default CrearProveedor;
