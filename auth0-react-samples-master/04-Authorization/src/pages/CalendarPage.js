import React from 'react';
import Calendar from '../comps/Calendar';
import TripPreference from '../comps/TripPreference';
import SuggestionCard from '../comps/SuggestionCard';
import Triposo from '../api/Triposo';

class CalendarPage extends React.Component {

	constructor(){
		super()
		this.state = {
			triposo: new Triposo(),
			mounted: false,
			trip: [],
			pois: []
		};
		this.findOpenActivity = this.findOpenActivity.bind(this);
		this.removeFromArray = this.removeFromArray.bind(this);
	}

	findOpenActivity(activities, currentDate){
		for (let i = 0; i < activities.length; i++){
			let activity = activities[i];
			if (activity.opening_hours === null) return activity;
			if (activity.opening_hours.open_24_7 === true) return activity;

			let currentDayName = currentDate.toString().split(' ')[0].toLowerCase();

			let dayHours = activity.opening_hours.days[currentDayName];

			if (dayHours.length === 0 || dayHours == undefined) return null;
			else {
				if (dayHours[0].start === null || dayHours[0].end == null) return null;
				if (currentDate.getHours() >= dayHours[0].start.hour && currentDate.getHours() <= dayHours[0].end.hour){
					return activity;
				}
				else return null;
			}
		}
		return null;
	}

	removeFromArray(array, elem){
		let index = array.indexOf(elem);
		if (index > -1) {
		  array.splice(index, 1);
		}
	}

	handleChange = (event, index, value) => this.setState({value});

	async componentDidMount(){
		let itinerary_items = [];
		const results = await this.state.triposo.getPOIs('Los_Angeles', 12);

		// for (let i of results.results){
		// 	// console.log(i);
		// }

		let hoursCount = 0;
		let currentDate = new Date(); // initialize with start date of trip
		let unsortedEvents = results.results;
		this.setState({ pois: unsortedEvents });	

		while (unsortedEvents.length != 0){
			let poi = this.findOpenActivity(unsortedEvents, currentDate);//get poi that is open on current hour and day
			if (poi !== null) {

				let month = currentDate.getMonth();
				let day = currentDate.getDate();
				let hour = currentDate.getHours();
				let startEventDate = new Date(2018, month, day, hour, 0, 0);
				let afterEventDate = new Date(2018, month, day, hour + 2, 0, 0);
                 
				let event = {
					title: poi.name,
					start: startEventDate,
					end:   afterEventDate
				};
				this.state.trip.push(event);
				this.removeFromArray(unsortedEvents, poi); //remove from unsortedEvents
			}
			currentDate.setHours(currentDate.getHours() + 2); //Ad two hours
			hoursCount += 2;
			if (hoursCount > 56){
				console.log("could not sort some");
				console.log(unsortedEvents);
				break;
			}
			//if currentDate has surpassed seven days or alloted trip days terminate loop, log error
		}

		this.setState({ mounted : true });
		// this.setState({ trip: results.results });
		// new Date(year, month, day, hour, min, sec, msec)
	}



	render(){
		const { isAuthenticated, login } = this.props.auth;
		let events;
		let pois = ['a', 'b', 'c'];
		if (this.state.mounted){
			events = this.state.trip;
		}	

		return(
			<div> 
				<div className="row">
					<div class="container col-md-2">
						<TripPreference />
					</div>
					<div class="container col-md-7">
						<h3>My Trip</h3>
						<hr/>					
						<Calendar events={events} tripStart={new Date()} />
					</div>


					<div class="container col-md-3">
						<h3>Suggestions</h3>	
						<hr/>			
						{pois.map( (poi) => {
							return <SuggestionCard />
							}
						)}
					</div>

					

				</div>
			</div>
		);
	}
}


export default CalendarPage;