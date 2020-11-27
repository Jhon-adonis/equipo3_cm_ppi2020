/**
 * Producto tiene propiedadeS:
 * Proveedor
 * Nombre
 * Precio
 * Cantidad
 * Codigo
 */

import React, { useRef, useEffect, useState } from 'react';
import { eliminarFactura } from '../services/conexionServidor';
import { numberFormatter } from '../services/utils';
import { useHistory } from 'react-router-dom';

function FacturaFijada({ data, deselector }) {
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
							¿Deseas eliminar esta Factura?
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
								onClick={() => eliminarFactura(data.id)}
							>
								ACEPTAR
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="card fixed-bottom sticky-bottom p-2"
				ref={referenciaProducto}
			>
				{data.cliente}
				<div className="float-right">
					<small>
						<p className="card-text text-muted">
							Factura No°{data.numero}
						</p>
					</small>
					<small>
						<p className="card-text text-muted">
							Por el valor de:{' '}
							{onClick={() => history.push('/crear-producto',{id:data.id})}
						</p>
					</small>
				</div>
				<div>
					<button
						className="btn btn-light p-0 pr-4"
						onClick={() => console.error('NOT IMPLEMENTED')}
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

export default FacturaFijada;
