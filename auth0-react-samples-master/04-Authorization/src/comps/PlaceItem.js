import React from 'react';
import { Link } from 'react-router-dom';

import face from '../assets/goodface.jpg';

import '../css/location-item.css';


class PlaceItem extends React.Component {
	render(){

		if (this.props.data.desc === undefined) this.props.data.desc = "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at";
		return(
			<div class="container border mb-5 card mx-3">
				<div class="row">

					<div class="col-3 p-0">
			        	<img src={this.props.data.image} alt="" class="mr-3 location-img"/>
			        </div>

			        <div class="col-8 ml-3 pb-5">
				        <div class="row my-3">
				        	<span class="location-type p-1 text-capitalize">{this.props.data.type}</span>
				        	<span class="location-price ml-auto">{this.props.data.price}</span>
				        </div>

				    	<div class="row">
					    	<h5 class="font-weight-bold">{this.props.data.name}</h5>
					    </div>

				    	<div class="row">					    
					    	<p class="pb-3 text-break">{this.props.data.desc}</p>
					    </div>

				    	<div class="row">					    					    
				
					    	<div class="divclass mx-1">
  								<i class="fa fa-bookmark"></i>
							</div>
							<div class="divclass">
  								<i class="fa fa-plus-square"></i>
							</div>

					    		<div class="row">
					    			<p> friends who visited here: </p>
					    			<div class="row">
						    			<div class="col-3">
						    				<img src={face} class="faces"/>
						    			</div>
						    			<div class="col-3">
						    				<img src={face} class="faces"/>
						    			</div>
						    		</div>
					   			</div>
					  	</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PlaceItem;