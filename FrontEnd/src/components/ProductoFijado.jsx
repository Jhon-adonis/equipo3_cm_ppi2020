/**
 * Producto tiene propiedadeS:
 * Proveedor
 * Nombre
 * Precio
 * Cantidad
 * Codigo
 */

import React, { useRef, useEffect, useState } from 'react';
import {
	eliminarProducto,
} from '../services/conexionServidor';
import { useHistory } from 'react-router-dom';

function ProductoFijado({ data, deselector }) {
	const referenciaProducto = useRef(null);
	const [useDetector, setDetector] = useState(true);
	const history = useHistory();

	useEffect(() => {
		if (referenciaProducto === null || !useDetector) {
			return;
		}
		function handleClickOutside(event) {
			if (
				referenciaProducto.current &&
				!referenciaProducto.current.contains(event.target)
			) {
				deselector();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [referenciaProducto, deselector, useDetector]);

	return (
		<>
			<div
				className="modal fade"
				id="staticBackdrop"
				data-backdrop="static"
				data-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							¿Deseas eliminar este producto?
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-light text-success"
								data-dismiss="modal"
								onClick={() => setDetector(true)}
							>
								CANCELAR
							</button>
							<button
								type="button"
								className="btn btn-light text-success"
								onClick={() => eliminarProducto(data.id)}
							>
								ACEPTAR
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="card fixed-bottom sticky-bottom"
				ref={referenciaProducto}
			>
				<div className="card-body p-0 px-3">
					{data.nombre}
					<p
						className={`card-text ${
							data.cantidad > 0 ? 'text-success' : 'text-danger'
						}`}
					>
						{data.cantidad > 0 ? 'Disponible' : 'Agotado'}
					</p>
					<p className="text-muted">Cantidad: {data.cantidad}</p>
				</div>
				<div>
					<button
						className="btn btn-light p-0 pr-4"
						onClick={() => history.push('/crear-producto',{id:data.id})}
					
					>
						Actualizar
					</button>
					<button
						className="btn btn-light p-0 pr-4"
						data-toggle="modal"
						data-target="#staticBackdrop"
						onClick={() => setDetector(false)}
					>
						Eliminar
					</button>
				</div>
				<div className="adjust-scroll-for-bottom" />
			</div>
		</>
	);
}

export default ProductoFijado;
