import React from 'react';

const DescartarGuardar = ({ onGuardar, onDescartar }) => {
	return (
		<div className="sticky-bottom fixed-bottom" style={{ height: '5vh' }}>
			<div className="row h-100 text-center font-weight-bold">
				<button
					className="btn col bg-azul-claro-2 p-2 rounded-0"
					onClick={onDescartar}
				>
					<h5>Descartar</h5>
				</button>
				<button
					className="btn col bg-gris-medio p-2 rounded-0"
					onClick={onGuardar}
				>
					<h5>Guardar</h5>
				</button>
			</div>
		</div>
	);
};

export default DescartarGuardar;
