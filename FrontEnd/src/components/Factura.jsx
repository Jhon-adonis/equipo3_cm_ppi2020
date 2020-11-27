/**
 * Producto tiene propiedadeS:
 * Proveedor
 * Nombre
 * Precio
 * Cantidad
 * Codigo
 */

import React from 'react';
import { numberFormatter } from '../services/utils';

function Factura({ data, selector }) {
	return (
		<button className="btn btn-block card" onClick={() => selector(data)}>
			<div className="card-body w-100">
				<div className="clearfix">
					<div className="float-left">
						{data.cliente}
						<small>
							<p className="card-text text-muted">
								No°{data.numero}
							</p>
						</small>
					</div>
					<div className="float-right">
						<small>
							<p className="card-text text-muted">
								{numberFormatter( data.productos ? data.productos.reduce((ac, val) => ac + val.valor + val.cantidad, 0) : 0)}
							</p>
						</small>
						<small>
							<p className="card-text text-muted">
								No°{data.numero}
							</p>
						</small>
					</div>
				</div>
			</div>
		</button>
	);
}

export default Factura;
