import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { IniciarSesion } from '../services/conexionServidor';
function InicioSesion() {

	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');

	const [correoError, setCorreoError] = useState('');
	const [contrasenaError, setContrasenaError] = useState('');

	const history = useHistory();
	return (
		<div className="container h-100">
			<div className="row align-items-center h-100 p-3">
				<div className="col mx-auto mb-4">
					<img
						src={Logo}
						alt="Logo"
						className="d-block mx-auto img-fluid"
						style={{ width: '20vmax', height: '20vmax' }}
					/>
					<h3 className="text-center">Accounting </h3>
					<h3 className="text-center">Record</h3>

					<label htmlFor="correo" className={`${
							correoError ? 'text-danger' : ''
						} font-weight-bold m-0`}
					>
						{correoError || 'Correo'}
					
					</label>
					<input
						type="text"
						value={correo}
						onChange={e => {setCorreo(e.target.value);setCorreoError(false)}}
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
						type="password"
						value={contrasena}
						onChange={e => {setContrasena(e.target.value);setContrasenaError(false)}}
						className="form-control formulario-input mb-4"
					/>
					<div className="text-center">
						<button
							className="btn btn-lg bg-azul-claro text-white mt-4 mx-auto d-block"
							style={{ height: '9vh' }}
							onClick={async e => {
								e.preventDefault();
								const { err,res } = await IniciarSesion(correo, contrasena);
								if (
									res?.statusError ===
									'No existe un usuario con correo'
								) {
									setCorreoError('No existe un usuario con ese correo');
								}else if(res?.statusError ===
									'Contrasena Incorrecta'){
										setContrasenaError('Contraseña Incorrecta');
								}
								 else if (err) {
									setCorreoError(
										'Ocurrio un error, intentalo más tarde',
									);
								} else {
									history.push('/principal');
								}
								
							}}
						>
							Iniciar sesión
						</button>
						<button
							className="btn btn-sm bg-light m-0 mx-auto"
							onClick={() => {
								history.push('/registro');
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

export default InicioSesion;
