/**
 * Este servicio se encarga de mantener un historial de navegación del usuario.
 * además permite añadir entradas al historial, es decir, hacerlo navegar.
 */
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default history;
