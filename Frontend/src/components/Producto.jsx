/**
 * Producto tiene propiedadeS:
 * Proveedor
 * Nombre
 * Precio
 * Cantidad
 * Codigo
 */

import React from 'react';

function Producto({ data, selector }) {
	return (
		<button className="btn btn-block card" onClick={() => selector(data)}>
			<div className="card-body">
				{data.nombre}
				<p
					className={`card-text ${
						data.cantidad > 0 ? 'text-success' : 'text-danger'
					}`}
				>
					{data.cantidad > 0 ? 'Disponible' : 'Agotado'}
				</p>
			</div>
		</button>
	);
}

export default Producto;
