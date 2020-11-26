import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Registrar } from '../services/conexionServidor';
function Registro() {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');
	const [confirmarContrasena, setConfirmarContrasena] = useState('');

	const [nombreError, setNombreError] = useState(false);
	const [correoError, setCorreoError] = useState(false);
	const [contrasenaError, setContrasenaError] = useState(false);

	const validarInputs = () => {
		let correoRegex = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
		let nombreCompletoRegex1 = new RegExp(/([A-Za-zÀ-ÖØ-öø-ÿ]+\s?\b){2,}/g);
		let nombreCompletoRegex2 = new RegExp(
			/^[A-Za-zÀ-ÖØ-öø-ÿ]+(([',. -][A-Za-zÀ-ÖØ-öø-ÿ])?[A-Za-zÀ-ÖØ-öø-ÿ]*)*$/g,
		);

		if (correo.indexOf('@') === -1) {
			setCorreoError('El correo no tiene @');
			console.log(nombreError, correoError, contrasenaError);
			return false;
		} else {
			if (correoRegex.exec(correo) === null) {
				setCorreoError('El correo no tiene un formato correcto');
				return false;
			}
		}
		if (
			nombreCompletoRegex1.exec(nombre) === null ||
			nombreCompletoRegex2.exec(nombre) === null
		) {
			setNombreError('El nombre no tiene un formato correcto');
			return false;
		}

		if (contrasena !== confirmarContrasena) {
			setContrasenaError('Las contraseñas no coinciden');
			return false;
		}
		if (contrasena.length < 6) {
			setContrasenaError('La contraseña es muy corta');
			return false;
		}

		return true;
	};

	const history = useHistory();
	return (
		<div className="container h-100">
			<div className="row align-items-center h-100 p-3">
				<div className="col mx-auto">
					<label
						htmlFor="nombre"
						className={`${
							nombreError ? 'text-danger' : ''
						} font-weight-bold m-0`}
					>
						{nombreError || 'Nombre'}
					</label>
					<input
						value={nombre}
						onChange={(e) => {setNombre(e.target.value); setNombreError(false)}}
						type="text"
						className="form-control formulario-input mb-4"
					/>

					<label htmlFor="correo" className={`${
							correoError ? 'text-danger' : ''
						} font-weight-bold m-0`}
					>
						{correoError || 'Correo'}
					
					</label>
					<input
						value={correo}
						onChange={(e) => {setCorreo(e.target.value); setCorreoError(false)}}
						type="text"
						className="form-control formulario-input mb-4"
					/>

					<label
						htmlFor="contrasena"
						className={`${
							contrasenaError ? 'text-danger' : ''
						} font-weight-bold m-0`}
					>
						{contrasenaError || 'Contraseña'}
					</label>
					<input
						value={contrasena}
						onChange={(e) => {setContrasena(e.target.value); setContrasenaError(false)}}
						type="password"
						className="form-control formulario-input mb-4"
					/>

					<label
						htmlFor="confirmar_contrasena"
						className="font-weight-bold m-0"
					>
						Confirmar &nbsp;Contraseña
					</label>
					<input
						value={confirmarContrasena}
						onChange={(e) => setConfirmarContrasena(e.target.value)}
						type="password"
						className="form-control formulario-input mb-4"
					/>
					<div className="text-center">
						<button
							className="btn btn-lg bg-azul-claro text-white my-4 mx-auto"
							style={{ height: '9vh' }}
							onClick={async (e) => {
								e.preventDefault();

								if (!validarInputs()) {
									return;
								}
								const { err, res } = await Registrar(
									nombre,
									correo,
									contrasena,
								);
								if (
									res?.statusError ===
									'Ya existe un usuario con ese correo'
								) {
									setCorreoError(res.statusError)
								} else if (err) {
									setNombreError(
										'Ocurrio un error, intentalo más tarde',
									);
								} else {
									history.push('/inicio');
								}
							}}
						>
							Registrarse
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registro;
