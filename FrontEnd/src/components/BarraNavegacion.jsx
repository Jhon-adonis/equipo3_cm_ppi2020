/**
 * Esto me tomo varias horas hacerlo, lo intente hacer de MUCHISIMAS maneras.
 * Quise hacerlo lo más fácil posible, lo más entendible, e incluso busque en internet
 * ejemplos de como la gente hacía esta barra. Ninguno me gusto, ni me parecio lo suficiente
 * mente bueno, así que lo hice a mi manera.
 *
 * Utiliza estados referencias y efectos, cosas muy dificiles de explicar.
 * Pero básicamente, son variables que me permiten saber que está haciendo el usuario y
 * responder ante ello
 */
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/BarraNavegacion.css';

function BarraNavegacion({ title = '' }) {
	const history = useHistory();
	const [estadoBarra, setEstadoBarra] = useState(false);
	const barraReferencia = useRef(null);
	useEffect(() => {
		if (barraReferencia === null) {
			return;
		}
		function handleClickOutside(event) {
			if (
				barraReferencia.current &&
				!barraReferencia.current.contains(event.target)
			) {
				setEstadoBarra(false);
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [barraReferencia]);

	const itemClases =
		'btn list-group-item list-group-item-action bg-azul-oscuro-1 text-white border-0 p-2 px-4 font-weight-bold text-left my-3';
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-gris-claro sticky-top p-0">
				<button
					className="btn text-white"
					onClick={() => setEstadoBarra(true)}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<span className="navbar-brand mr-auto ml-2 font-weight-bold use-roboto">
					{title}
				</span>
			</nav>
			<div
				className={`bg-azul-oscuro-1 h-100 use-roboto sidebar ${
					estadoBarra ? 'active' : ''
				}`}
				ref={barraReferencia}
			>
				<div className="bg-azul-oscuro-2 text-white p-4">
					<p>Murat Mutlu</p>
					<small>
						<p className="font-weight-light">Graphic Designers</p>
					</small>
				</div>
				<div className="list-group list-group-flush bg-azul-oscuro-1">
					<button
						className={itemClases}
						onClick={() => {
							history.push('/productos');
						}}
					>
						Productos
					</button>
					<button
						className={itemClases}
						onClick={() => {
							history.push('/facturas');
						}}
					>
						Facturas
					</button>
					<button
						className={itemClases}
						onClick={() => {
							history.push('/clientes');
						}}
					>
						Clientes
					</button>
					<button
						className={itemClases}
						onClick={() => {
							history.push('/proveedores');
						}}
					>
						Proveedores
					</button>
					<hr className="w-100 bg-gris-oscuro" />
					<button className="list-group-item list-group-item-action disabled bg-azul-oscuro-1 border-0">
						Settings
					</button>
					<button className="list-group-item list-group-item-action disabled bg-azul-oscuro-1 border-0">
						Rate us
					</button>
				</div>
			</div>
		</>
	);
}

export default BarraNavegacion;
