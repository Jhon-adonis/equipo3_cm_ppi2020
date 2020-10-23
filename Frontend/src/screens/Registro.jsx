import React from 'react';
import { useHistory } from 'react-router-dom';
function Registro() {
	const history = useHistory();
	return (
		<div className="container h-100">
			<div className="row align-items-center h-100 p-3">
				<div className="col mx-auto">
					<label htmlFor="nombre" className="font-weight-bold m-0">
						Nombre
					</label>
					<input
						type="text"
						id="nombre"
						className="form-control formulario-input mb-4"
					/>

					<label htmlFor="correo" className="font-weight-bold m-0">
						Correo
					</label>
					<input
						type="text"
						id="correo"
						className="form-control formulario-input mb-4"
					/>

					<label
						htmlFor="contrasena"
						className="font-weight-bold m-0"
					>
						Contraseña
					</label>
					<input
						type="text"
						id="contrasena"
						className="form-control formulario-input mb-4"
					/>

					<label
						htmlFor="confirmar_contrasena"
						className="font-weight-bold m-0"
					>
						Confirmar &nbsp;Contraseña
					</label>
					<input
						type="text"
						id="confirmar_contrasena"
						className="form-control formulario-input mb-4"
					/>
					<div className="text-center">
						<button
							className="btn btn-lg bg-azul-claro text-white my-4 mx-auto"
							style={{ height: '9vh' }}
							onClick={() => {
								alert('NO IMPLEMENTADO');
								window.localStorage.setItem('auth', 'true');
								history.push('/productos');
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
