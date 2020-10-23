import React, { useState } from 'react';
import { numberFormatter } from '../services/utils';

const ProductoFactura = ({ producto, selectorCantidad }) => {
	const [cantidadProducto, setCantidadProducto] = useState(1);
	return (
		<div className="form-row mb-2">
			<div className="col text-left">{producto.nombre}</div>
			<div className="col text-center">✕</div>
			<div className="col">
				<input
					className="form-control formulario-input w-50"
					type="number"
					name="cantidad_producto"
					min="1"
					max={producto.cantidad}
					value={cantidadProducto}
					onChange={(e) => {
						setCantidadProducto(e.target.value);
						selectorCantidad(
							isNaN(parseInt(e.target.value))
								? 1
								: parseInt(e.target.value),
						);
					}}
				/>
			</div>
			<div className="col">
				{numberFormatter(
					producto.valor *
						(isNaN(cantidadProducto) ? 0 : cantidadProducto),
				)}
			</div>
		</div>
	);
};
export default ProductoFactura;
