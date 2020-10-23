import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/Logo.png';
function Registro() {
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
					<label
						htmlFor="correo"
						className="font-weight-bold color-gris-oscuro m-0"
					>
						Correo
					</label>
					<input
						type="text"
						id="correo"
						className="form-control formulario-input mb-4"
					/>
					<label
						htmlFor="contrasena"
						className="font-weight-bold color-gris-oscuro m-0"
					>
						Contraseña
					</label>
					<input
						type="text"
						id="contrasena"
						className="form-control formulario-input mb-4"
					/>
					<div className="text-center">
						<button
							className="btn btn-lg bg-azul-claro text-white mt-4 mx-auto d-block"
							style={{ height: '9vh' }}
							onClick={() => {
								alert('NO IMPLEMENTADO');
								window.localStorage.setItem('auth', 'true');
								history.push('/productos');
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

export default Registro;
