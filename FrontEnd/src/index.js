/**
 * Este archivo es el principal, NO TOCAR, no hace nada especial, solo es la entrada para react
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './assets/AbrilFatface-Regular.ttf';
import './index.css';

import history from './services/history';

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
