import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import AutoComplete from './AutoComplete';


import '../css/navbar.css';

class NavBar extends React.Component {

	render(){
		return(					 
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			  <div class="navbar-collapse collapse show" id="navbarColor01" >
			  	{/*<form class="form-inline my-2 my-lg-0 mx-3">
			    	<AutoComplete />
					</form>*/}
			    <ul class="navbar-nav">
			      <li class="nav-item mx-3 my-3">
			 		<a class="landing-link ml-auto">Recommended</a>
			      </li>
			      <li class="nav-item mx-3 my-3">
			 		 <a class="landing-link">Friends</a>
			      </li>
			      <li class="nav-item mx-3 my-3">
			  		<a class="landing-link">My Profile</a>		
			      </li>
			    </ul>

			  </div>

			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation" >
			    <span class="navbar-toggler-icon"></span>
			  </button>

			</nav>

		);
	}
}

export default NavBar;