import React from 'react';
import Triposo from '../api/Triposo';
import Firebase from '../api/Firebase';
import LocationGridList from '../comps/LocationGridList';
import TripPreference from '../comps/TripPreference';
import GeoLocation from '../api/GeoLocation';
import {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';
import '../css/landingpage.css';	
import '../css/mainpage.css';
import '../css/global.css'
import 'font-awesome/css/font-awesome.css';
import zoe from '../assets/zoe.jpg';
import jon from '../assets/jon.jpg';
import joshua from '../assets/joshua.jpg';
import david from '../assets/david.jpg';
import sean from '../assets/sean.jpg';
import { Grid, Row, Col } from 'react-flexbox-grid';


const photos= [
    { id: 1, images :[ zoe, jon, joshua, david, sean ]},
    { id: 2, images : [ jon, joshua, sean] },
    { id: 3, images : [ sean, zoe] },
    { id: 4, images : [jon, david] },
]

class CityPage extends React.Component{
    constructor(){
		super();
		this.state = {
			Triposo: new Triposo(),
			pageData: null,
			address:'',
			locations: [],
			mounted: false,
			firstSlider: 1,
			secondSlider: 50,
		};	
	}


	async componentDidMount(){
		const results = await this.state.Triposo.getCitiesbyCat('surfing');		
		console.log(results);
		this.setState({ pageData: results });
		this.setState({ mounted: true });
		const db = new Firebase();
		console.log(await db.getUser('zAaB9hXIVi0RvGmhOWRN'));
		console.log( await db.getInterests());
		
        // Asynchronously load the Google Maps script, passing in the callback reference

	}


	handleFirstSlider = (event, value) => {
		this.setState({firstSlider: value});
	};
	
	handleSecondSlider = (event, value) => {
		this.setState({secondSlider: value});
	};

	handleChange = address => {
		this.setState({ address });
	  };
	
	handleSelect = address => {
		geocodeByAddress(address)
		  .then(results => getLatLng(results[0]))
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	  };
  render() {
    const { profile } = this.state;
    const { isAuthenticated, login } = this.props.auth;
    let apiData = [];
    let tiles = [];
    if (this.state.mounted){
        for(let item of this.state.pageData.results){
            var min = 0;
            var max = 3;
            var rand =   Math.round(min + (Math.random() * (max-min)));
            let data = {
                title: item.name,
                type: item.type,
                desc: item.snippet,
                image: item.images[0].source_url,
                icons: photos[rand].images
            };
			apiData.push(data);
			
        }
	}
    return (
		<div>
			<div class="root">
				<div class="container">
				<Row>
          			<Col xs={4} md={3}>
					  	<TripPreference />
         			</Col>
          			<Col xs={8} md={9}>
					  <LocationGridList data={apiData} />
         			</Col>
       			 </Row>
				</div>
			</div>
		</div>  
    );
  }
}

export default CityPage
//		<LocationControls 	firstSlider={7} 
//secondSlider={800} 
//handleFirstSlider={this.handleFirstSlider.bind(this)} 
//handleSecondSlider={this.handleSecondSlider.bind(this)} />