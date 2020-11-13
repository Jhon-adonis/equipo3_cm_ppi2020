/**
 * Sofi mira esto
 * Esto me tomo varias horas hacerlo, lo intente hacer de MUCHISIMAS maneras.
 * Quise hacerlo lo más fácil posible, lo más entendible, e incluso busque en internet
 * ejemplos de como la gente hacía esta barra. Ninguno me gusto, ni me parecio lo suficiente
 * mente bueno, así que lo hice a mi manera.
 *
 * Utiliza estados referencias y efectos, cosas muy dificiles de explicar.
 * Pero básicamente, son variables que me permiten saber que está haciendo el usuario y
 * responder ante ello
 */
import React, { useState } from 'react';
import '../styles/BarraBusqueda.css';

function BarraBusqueda() {
	const [valor, setValor] = useState('');

	// eslint-disable-next-line no-unused-vars
	const funcionDeFiltro = () => {};

	return (
		<form className="d-flex w-80 mx-auto bg-gris-claro mb-2">
			<input
				className={`form-control m-2 bg-white rounded ${
					valor === '' ? 'buscar-icono' : ''
				}`}
				type="search"
				aria-label="Buscar"
				value={valor}
				onChange={(e) => setValor(e.target.value)}
			/>
		</form>
	);
}

export default BarraBusqueda;
