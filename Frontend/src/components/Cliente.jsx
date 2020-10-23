/**
 * Producto tiene propiedadeS:
 * Proveedor
 * Nombre
 * Precio
 * Cantidad
 * Codigo
 */

import React from 'react';
import User from '../assets/User.png';

function Cliente({ data, selector }) {
	return (
		<button className="btn btn-block card" onClick={() => selector(data)}>
			<div className="card-body w-100">
				<div className="row">
					<div className="col-xs-4 mr-4">
						<img
							src={User}
							alt={'Cliente Imagen'}
							className="rounded-circle "
							style={{ width: '13vw', height: '13vw' }}
						/>
					</div>
					<div className="col-xs-4 text-left my-auto">
						{data.nombre}
						<p className="card-text text-muted">{data.empresa}</p>
					</div>
				</div>
			</div>
		</button>
	);
}

export default Cliente;
