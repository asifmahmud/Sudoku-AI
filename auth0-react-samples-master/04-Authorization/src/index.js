import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
