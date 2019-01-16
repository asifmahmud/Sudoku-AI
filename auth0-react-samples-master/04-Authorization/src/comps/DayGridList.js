import React from 'react';
import Loading from 'react-loading-animation';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GooglePlaces from '../api/GooglePlaces';
import NavBar from '../comps/NavBar';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Triposo from '../api/Triposo';
import Firebase from '../api/Firebase';
import IconButton from 'material-ui/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from 'material-ui/Snackbar';
import DayPlanActivityTile from '../comps/DayPlanActivityTile';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import face from '../assets/goodface.jpg';
import pilo from '../assets/silenus.jpg';
import '../css/activitypage.css';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Share from 'material-ui/svg-icons/social/share';
import zoe from '../assets/zoe.jpg';
import jon from '../assets/jon.jpg';
import joshua from '../assets/joshua.jpg';
import david from '../assets/david.jpg';
import sean from '../assets/sean.jpg';
import anton from '../assets/anton.jpg';
import chanel from '../assets/chanel.jpg';
import dan from '../assets/dan.jpg';
import kellie from '../assets/kellie.jpg';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Paper from '@material-ui/core/Paper';
import noImage from '../assets/noimagefound.jpeg';
import Popover from '@material-ui/core/Popover';
import Fade from '@material-ui/core/Fade';



function TabContainer(props) {
	return (
	  <Typography component="div" style={{ padding: 8 * 3 }}>
		{props.children}
	  </Typography>
	);
  }
  
  
  TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
  };

  
  const styles = theme => ({
	tapDisplay: {
	  flexGrow: 1,
	  width: '100%',
	  backgroundColor: theme.palette.background.paper,
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	
	typography: {
		padding: theme.spacing.unit * 2,
		margin: 'auto',
	},
	
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	  },
  });

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

class DayGridList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Firebase: new Firebase(),
			GooglePlaces: new GooglePlaces(),
			tapValue:0,
			autoHideDuration: 4000,
			message: 'Event added to your calendar',
			open: false,
			popOpen: false,
			mounted:false,
			budget:'',
			anchorEl: null,
			cost:0,
			noResult:false,
			currency:'',
			apiData:[],
			location:'',
		};  
	
		this.getActivity = this.getActivity.bind(this);
	}


	componentWillReceiveProps(nextProps) {
		if(this.state.noResult !== nextProps.noResult){
			this.setState({ noResult:nextProps.noResult });
		}
		if(this.state.apiData !== nextProps.data){
			this.setState({ apiData:nextProps.data });
		}
		if(this.state.budget !== nextProps.budget){
			this.setState({ budget:nextProps.budget });
		}
		if(this.state.currency !== nextProps.currency){
			this.setState({ currency:nextProps.currency});
		}
		if(this.state.location !== nextProps.location && nextProps.location!==null){
			var location = (nextProps.location).replace('_', ' ');
			this.setState({ location:location });
		}
		if(nextProps.budget!==null && (this.state.budget !== nextProps.budget||this.state.apiData.results!= null &&(this.state.apiData.results[0].days).length !== (nextProps.data.results[0].days).length)){
			const costArr = nextProps.budget;
			const costMid = costArr[costArr.length-1];
			this.setState({ cost: this.calculateCost(costMid.value_midrange,(nextProps.data.results[0].days).length)});
			this.setState({ mounted: true });
		}
	
    }

	getPlanInfo(){
		return this.props.getPlan(this.state.pageData);
	}


	handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
	};
	
	handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
	
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

	handleTapChange = (event, value) => {
		this.setState({ tapValue:value });
	};

	showCostDetails(){
		this.setState({ details:true });
	};

	handleActionClick = () => {
		this.setState({
		  open: false,
		});
		alert('Event removed from your calendar.');
	};



	calculateCost(days,cost){
		return Math.round(days*cost);
	}




	render(){
		const { classes } = this.props;
		let content;
		let apiData = new Array ();
		let dateData = []; 
		const { anchorEl} = this.state;
		const popOpen = Boolean(anchorEl);
	
		if (this.state.mounted){
			if (this.state.noResult===false){
				for(let i = 0; i < this.state.apiData.results[0].days.length; i++){
					apiData[i] = new Array ();
					for(let j = 0; j <this.state.apiData.results[0].days[i].itinerary_items.length; j++){
						var poi  = this.state.apiData.results[0].days[i].itinerary_items[j];
						let item = poi.poi;
						var min = 0;
						var max = 7;
						var rand =   Math.round(min + (Math.random() * (max-min)));
						let imageSource = (item.images.length === 0 ? null : item.images);
						let data = {
							date:this.state.apiData.results[0].days[i].date,
							icons: photos[rand].images,
							id: item.id,
							name: item.name,
							title: poi.title,
							snippet: item.snippet,
							desc: poi.description,
							coordinates: item.coordinates,
							language: item.snippet_language_info,
							image: imageSource,
							price: item.price_tier,
						};
					
						apiData[i].push(data); 
					}
					dateData.push(this.state.apiData.results[0].days[i].date); 
				}
			
				return(
					<div>
						<Row>
							<Col xs={8} md={9}>
								<h3> Your Trip to {this.state.location}</h3> 
							</Col>
							<Col xs={4} md={3}>
								<FloatingActionButton mini={true}  onClick={this.getPlanInfo.bind(this)}>
									<ContentAdd />
								</FloatingActionButton>
								<IconButton tooltip="Save This Plan" touch={true} tooltipPosition="bottom-right">
									<ActionGrade color="secondary"/>
								</IconButton>	
								<IconButton tooltip="Share" color="primary" touch={true} tooltipPosition="bottom-right">
									<Share/>
								</IconButton>
							</Col>
						</Row>
						<Row>
								<h3> Est. Spending: {this.state.cost} {this.state.currency}</h3> 
								<Fab  aria-owns={popOpen ? 'simple-popper' : undefined}  variant="extended"  onClick={this.handleClick} className={classes.fab} >
									<NavigationIcon className={classes.extendedIcon} />
										Details
								</Fab>
								<Popover id="simple-popper" open={popOpen} anchorEl={anchorEl}  onClose={this.handleClose} anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}} transition>
										<Paper>
											<Typography className={classes.typography}>
												<h4>Estimated Spending Per Day ({this.state.currency})</h4>
													{(this.state.budget).map(data => 
														<Typography variant="h5" component="h3">
															{data.name} : {Math.round(data.value_midrange)}
														</Typography>
														)
													}
											</Typography>
										</Paper>
									</Popover>
						</Row>
								<div className={classes.tapDisplay}>
								<AppBar position="static" color="default">
									<Tabs
										value={this.state.tapValue}
										onChange={this.handleTapChange}
										indicatorColor="primary"
										textColor="primary"
										scrollable
										scrollButtons="auto"
									>
												
									{(apiData).map((data,index) => 
										<Tab label={"Day " + (index+1)}/>
									)}
		
									</Tabs>
								</AppBar>	
								{(apiData).map((data,index) => 
									this.state.tapValue === index &&
									(data).map((tile, j) => 
											<DayPlanActivityTile data={tile}  className={classes}  getActivity={this.getActivity} />	
									)
								)}
							</div>
						
									
							<Snackbar
								open={this.state.open}
								message={this.state.message}
								action="undo"
								autoHideDuration={this.state.autoHideDuration}
								onActionClick={this.handleActionClick}
								onRequestClose={this.handleEventRequestClose}
							/>
		
					</div>	 		
			);
		} else {
			 return(<div>
				 			<h5>No results found.</h5> 
			 				<p> - Check if your spelling is correct </p>
							<p> - Explore destinations </p>
							<p> - Contact us </p>
				</div>);
		}
	} else { 
		return(content = <Loading />);
	}
		
		
		 //.value_midrange;
		//let cost = this.calculateCost(costMid,dateData.length);
		//1 image name, reviews,adored by, more info (hang). 
		//Inside: Bookings for activities, or more for (breakfast).
		
	}
}


DayGridList.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(DayGridList);
