import React from 'react';
import Loading from 'react-loading-animation';

import NavBar from '../comps/NavBar';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Triposo from '../api/Triposo';
import Firebase from '../api/Firebase';

import Snackbar from 'material-ui/Snackbar';
import ActivityTile from '../comps/ActivityTile';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import face from '../assets/goodface.jpg';
import pilo from '../assets/silenus.jpg';
import '../css/activitypage.css';


import zoe from '../assets/zoe.jpg';
import jon from '../assets/jon.jpg';
import joshua from '../assets/joshua.jpg';
import david from '../assets/david.jpg';
import sean from '../assets/sean.jpg';
import anton from '../assets/anton.jpg';
import chanel from '../assets/chanel.jpg';
import dan from '../assets/dan.jpg';
import kellie from '../assets/kellie.jpg';


const photos= [
    { id: 1, images :[ zoe, jon ]},
    { id: 2, images : [ jon, sean] },
    { id: 3, images : [ sean, zoe] },
	{ id: 4, images : [zoe, anton] },
	{ id: 5, images :[ chanel, anton ]},
    { id: 6, images : [ kellie, sean] },
    { id: 7, images : [ kellie, zoe] },
    { id: 8, images : [zoe, david] },
]

class LocationPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Firebase: new Firebase(),
			Triposo: new Triposo(),
			pageData: [],
		
			mounted: false,
			placeID: '',
			address:'',
			localHot: null,
			opening_hours:[],
			autoHideDuration: 4000,
			message: 'Event added to your calendar',
			open: false,
			cat :['Food','Art','Adventure'],
		};  
	
		this.getActivity = this.getActivity.bind(this);
	}



	async componentDidMount(){
		console.log(this.props.match.params.id);
		const resultsFood = await this.state.Triposo.getPOIByID(['eatingout','foodexperiences'],this.props.match.params.id);	
		const resultsArt = await this.state.Triposo.getPOIByID(['museums','dancing'],this.props.match.params.id);	
		const resultsAdventure = await this.state.Triposo.getPOIByID(['hiking','paragliding','adrenaline'],this.props.match.params.id);	
	//	const hots = await this.state.Triposo.getHot();	
	//	console.log(hots);
	//	this.setState({ localHot: hots})
		this.setState({ pageData: [resultsFood, resultsArt, resultsAdventure] });
		this.setState({ mounted: true });
	}

	
	getActivity(activityInfo){
		console.log(activityInfo);
		this.setState({
			open: true,
		});
		this.state.Firebase.addActivityToPlan('zAaB9hXIVi0RvGmhOWRN', 'plan1', activityInfo);
	}

	handleChangeDuration = (event) => {
		const value = event.target.value;
		this.setState({
		  autoHideDuration: value.length > 0 ? parseInt(value) : 0,
		});
	  ;
	}

	handleEventRequestClose = () => {
		this.setState({
		  open: false,
		});
	};


	handleActionClick = () => {
		this.setState({
		  open: false,
		});
		alert('Event removed from your calendar.');
	};
	  
	render(){
		const { isAuthenticated, login } = this.props.auth;
		const styles = {
			root: {
			  display: 'flex',
			  flexWrap: 'wrap',
			  justifyContent: 'space-around',
			},
			gridList: {
			  display: 'flex',
			  flexWrap: 'nowrap',
			  overflowX: 'auto',
			  width: '80%',
			  height: '380px',
			},
			titleStyle: {
			  color: 'rgb(0, 188, 212)',
			},
		};

		  
		let content;
		let apiData = [[], [], []];
		let apiHot = [];
		if (this.state.mounted){
			/*for(let item of this.state.localHot.results[0].pois){
				var min = 0;
				var max = 3;
				var rand =   Math.round(min + (Math.random() * (max-min)));
				let imageSource = (item.images.length === 0 ? pilo: item.images[0].source_url);
				let dayHours = {};
				let data = {
					id: item.id,
					name: item.name,
					location: item.location_id,
					desc: item.snippet,
					image: imageSource,
					price: item.price_tier,
					tags: item.tag_labels,
					hours: item.opening_hours,
					googleID: item.google_place_id,
					icons: photos[rand].images,
					mon_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.mon && item.opening_hours.days.mon[0] && item.opening_hours.days.mon[0].start && item.opening_hours.days.mon[0].start.hour? item.opening_hours.days.mon[0].start.hour: "unknown",
					mon_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.mon && item.opening_hours.days.mon[0] && item.opening_hours.days.mon[0].end && item.opening_hours.days.mon[0].end.hour? item.opening_hours.days.mon[0].end.hour: "unknown",
					tue_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.tue && item.opening_hours.days.tue[0] && item.opening_hours.days.tue[0].start && item.opening_hours.days.tue[0].start.hour? item.opening_hours.days.tue[0].start.hour: "unknown",
					tue_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.tue && item.opening_hours.days.tue[0] && item.opening_hours.days.tue[0].end && item.opening_hours.days.tue[0].end.hour? item.opening_hours.days.tue[0].end.hour: "unknown",
					wed_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.wed && item.opening_hours.days.wed[0] && item.opening_hours.days.wed[0].start && item.opening_hours.days.wed[0].start.hour? item.opening_hours.days.wed[0].start.hour: "unknown",
					wed_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.wed && item.opening_hours.days.wed[0] && item.opening_hours.days.wed[0].end && item.opening_hours.days.wed[0].end.hour? item.opening_hours.days.wed[0].end.hour: "unknown",
					thu_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.thu && item.opening_hours.days.thu[0] && item.opening_hours.days.thu[0].start && item.opening_hours.days.thu[0].start.hour? item.opening_hours.days.thu[0].start.hour: "unknown",
					thu_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.thu && item.opening_hours.days.thu[0] && item.opening_hours.days.thu[0].end && item.opening_hours.days.thu[0].end.hour? item.opening_hours.days.thu[0].end.hour: "unknown",
					fri_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.fri && item.opening_hours.days.fri[0] && item.opening_hours.days.fri[0].start && item.opening_hours.days.fri[0].start.hour? item.opening_hours.days.fri[0].start.hour: "unknown",
					fri_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.fri && item.opening_hours.days.fri[0] && item.opening_hours.days.fri[0].end && item.opening_hours.days.fri[0].end.hour? item.opening_hours.days.fri[0].end.hour: "unknown",
					sat_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sat && item.opening_hours.days.sat[0] && item.opening_hours.days.sat[0].start && item.opening_hours.days.sat[0].start.hour? item.opening_hours.days.sat[0].start.hour: "unknown",
					sat_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sat && item.opening_hours.days.sat[0] && item.opening_hours.days.sat[0].end && item.opening_hours.days.sat[0].end.hour? item.opening_hours.days.sat[0].end.hour: "unknown",
					sun_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sun && item.opening_hours.days.sun[0] && item.opening_hours.days.sun[0].start && item.opening_hours.days.sun[0].start.hour? item.opening_hours.days.sun[0].start.hour: "unknown",
					sun_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sun && item.opening_hours.days.sun[0] && item.opening_hours.days.sun[0].end && item.opening_hours.days.sun[0].end.hour? item.opening_hours.days.sun[0].end.hour: "unknown",
				};
				apiHot.push(data);
			}
			*/
		
	
			for(let i = 0; i < this.state.pageData.length; i++){
				console.log(this.state.pageData[i]);
				for(let j = 0; j <(this.state.pageData[i].results).length; j++){
					let item = (this.state.pageData[i].results)[j];
					
					var min = 0;
					var max = 7;
					var rand =   Math.round(min + (Math.random() * (max-min)));

					let imageSource = (item.images.length === 0 ? null : item.images[0].source_url);
					let dayHours = {};
					let data = {
						icons: photos[rand].images,
						id: item.id,
						name: item.name,
						location: item.location_id,
						desc: item.snippet,
						image: imageSource,
						price: item.price_tier,
						tags: item.tag_labels,
						hours: item.opening_hours,
						mon_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.mon && item.opening_hours.days.mon[0] && item.opening_hours.days.mon[0].start && item.opening_hours.days.mon[0].start.hour? item.opening_hours.days.mon[0].start.hour: "unknown",
						mon_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.mon && item.opening_hours.days.mon[0] && item.opening_hours.days.mon[0].end && item.opening_hours.days.mon[0].end.hour? item.opening_hours.days.mon[0].end.hour: "unknown",
						tue_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.tue && item.opening_hours.days.tue[0] && item.opening_hours.days.tue[0].start && item.opening_hours.days.tue[0].start.hour? item.opening_hours.days.tue[0].start.hour: "unknown",
						tue_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.tue && item.opening_hours.days.tue[0] && item.opening_hours.days.tue[0].end && item.opening_hours.days.tue[0].end.hour? item.opening_hours.days.tue[0].end.hour: "unknown",
						wed_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.wed && item.opening_hours.days.wed[0] && item.opening_hours.days.wed[0].start && item.opening_hours.days.wed[0].start.hour? item.opening_hours.days.wed[0].start.hour: "unknown",
						wed_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.wed && item.opening_hours.days.wed[0] && item.opening_hours.days.wed[0].end && item.opening_hours.days.wed[0].end.hour? item.opening_hours.days.wed[0].end.hour: "unknown",
						thu_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.thu && item.opening_hours.days.thu[0] && item.opening_hours.days.thu[0].start && item.opening_hours.days.thu[0].start.hour? item.opening_hours.days.thu[0].start.hour: "unknown",
						thu_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.thu && item.opening_hours.days.thu[0] && item.opening_hours.days.thu[0].end && item.opening_hours.days.thu[0].end.hour? item.opening_hours.days.thu[0].end.hour: "unknown",
						fri_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.fri && item.opening_hours.days.fri[0] && item.opening_hours.days.fri[0].start && item.opening_hours.days.fri[0].start.hour? item.opening_hours.days.fri[0].start.hour: "unknown",
						fri_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.fri && item.opening_hours.days.fri[0] && item.opening_hours.days.fri[0].end && item.opening_hours.days.fri[0].end.hour? item.opening_hours.days.fri[0].end.hour: "unknown",
						sat_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sat && item.opening_hours.days.sat[0] && item.opening_hours.days.sat[0].start && item.opening_hours.days.sat[0].start.hour? item.opening_hours.days.sat[0].start.hour: "unknown",
						sat_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sat && item.opening_hours.days.sat[0] && item.opening_hours.days.sat[0].end && item.opening_hours.days.sat[0].end.hour? item.opening_hours.days.sat[0].end.hour: "unknown",
						sun_open: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sun && item.opening_hours.days.sun[0] && item.opening_hours.days.sun[0].start && item.opening_hours.days.sun[0].start.hour? item.opening_hours.days.sun[0].start.hour: "unknown",
						sun_close: item.opening_hours && item.opening_hours.days && item.opening_hours.days.sun && item.opening_hours.days.sun[0] && item.opening_hours.days.sun[0].end && item.opening_hours.days.sun[0].end.hour? item.opening_hours.days.sun[0].end.hour: "unknown",
					};
					apiData[i].push(data);
				}
			} 
		
		}
		else content = <Loading />
		console.log(apiData);
		return(
			<div>
			
					{/*<div class="container">
						<div class="row">
							<h3 class="ml-4">Local hotspots</h3>
						</div>
					
                   
					<GridList style={styles.gridList} cols={2.2}>
						{(apiHot).map((tile) => {
							return <ActivityTile data={tile} styles={styles}  getActivity={this.getActivity} />
						})}
					</GridList>
					<Snackbar
          				open={this.state.open}
          				message={this.state.message}
         				action="undo"
          				autoHideDuration={this.state.autoHideDuration}
          				onActionClick={this.handleActionClick}
          				onRequestClose={this.handleEventRequestClose}
        			/>
					</div>*/}
					 
					{(apiData).map((data,index) => {
						return(
							<div class="container">
								<div class="row">
									<h3 class="ml-4">{this.state.cat[index]}</h3>
								</div>
							
							<GridList style={styles.gridList} cols={2.2}>
								{(data).map((tile) => {
									return <ActivityTile data={tile} styles={styles}  getActivity={this.getActivity} />
								})}
							</GridList>
							<Snackbar
								open={this.state.open}
								message={this.state.message}
								action="undo"
								autoHideDuration={this.state.autoHideDuration}
								onActionClick={this.handleActionClick}
								onRequestClose={this.handleEventRequestClose}
							/>
						</div>
						)

					}
				)
			}
			</div>	 		
		);
	}
}

export default LocationPage;