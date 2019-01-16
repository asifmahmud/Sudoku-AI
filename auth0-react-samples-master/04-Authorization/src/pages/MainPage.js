import React from 'react';
import Triposo from '../api/Triposo';
import Firebase from '../api/Firebase';
import GeoLocation from '../api/GeoLocation';
import AutoComplete from '../comps/AutoComplete';
import LocationGridList from '../comps/LocationGridList';
import Loading from 'react-loading-animation';
import '../css/mainpage.css';
import '../css/navbar.css';
import '../css/global.css'
import 'font-awesome/css/font-awesome.css';
import '../css/landingpage.css';	

import { Navbar, Button } from 'react-bootstrap';
  
class MainPage extends React.Component {
	constructor(){
		super();
		this.state = {
      Triposo: new Triposo(),
			pageData: null,
			locations: [],
			mounted: false,
			firstSlider: 1,
      secondSlider: 50,
      GeoLocation: new GeoLocation(),
      value: '', 
      suggestions: [],
      redirect: false, 
		};	
  }
  
  

	goTo(route) {
		this.props.history.replace(`/${route}`)
	  }
	
	login() {
		this.props.auth.login();
	}
	
	logout() {
		this.props.auth.logout();
	}
	

	async componentDidMount(){
		const results = await this.state.Triposo.getCitiesbyCat(['wineries','music','museum'], "33.6845673,-117.82650490000003", 70000000);		
		this.setState({ pageData: results });
		this.setState({ mounted: true });
		const db = new Firebase();
		console.log(await db.getUser('zAaB9hXIVi0RvGmhOWRN'));
		console.log( await db.getInterests());
	}

	render(){
    if (this.state.mounted === true){
		const { isAuthenticated, login } = this.props.auth;
		return(
      <div>
				 <Navbar fluid>
          <Navbar.Header>
			
		  <img src={require('../assets/logo-transparent.png')} alt="Plan-A-Trip" class="logo" />
            <Navbar.Brand  class= "navbar-element">
              <a href="/">Plan A Trip</a>
            </Navbar.Brand>
            
            <Button  class= "navbar-element"
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'Cities')}
            >
							Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button  class= "navbar-element"
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
           
            {
              isAuthenticated() && (
                  <Button  class= "navbar-element"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'friends')}
                  >
									  Friends
                  </Button>
                )
            }
             {
              isAuthenticated() && (
                  <Button  class= "navbar-element"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'persona')}
                  >
                    My Profile
                  </Button>
                )
            }
			  	  {/*<AutoComplete class= "navbar-element pull-right"
            />*/}
            {
              isAuthenticated() && (
                  <Button 
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
       	</Navbar>
      </div>
    );
  } else {
    return (<Loading/>);
  }
}
}

export default MainPage;
