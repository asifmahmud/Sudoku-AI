import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './pages/MainPage';
import Persona from './pages/PersonaPage';
import Cities from './pages/CityPage';
import Location from './pages/LocationPage';
import Paypal from './pages/PaypalCheckout';
import Callback from './Callback/Callback';
import Calendar from './pages/CalendarPage';
import Auth from './Auth/Auth';
import history from './history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <MuiThemeProvider>
    <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/persona" render={(props) => <Persona auth={auth} {...props} />} />
          <Route path="/paypal" render={(props) => <Paypal auth={auth} {...props} />} />
          <Route path="/calendar" render={(props) => <Calendar auth={auth} {...props} />} />
          <Route path="/cities" render={(props) => <Cities auth={auth} {...props} />} />
          <Route path="/friends" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/persona"/>
            ) : (
              <App auth={auth} {...props} />
            )
          )} />
         	<Route path="/location/:id" render={(props) => <Location auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
      </MuiThemeProvider>
  );
}
