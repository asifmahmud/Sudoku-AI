/*Location *Hotel Nearby (optional) *start date* end date *items per day (optional)
*recent plans (login to view)
options: like this plan, save this plan, share this plan with a friend */


import React from 'react';
import Triposo from '../api/Triposo';
import BudgetYourTrip from '../api/BudgetYourTrip';
import Firebase from '../api/Firebase';
import Loading from 'react-loading-animation';
import PlannerControl from '../comps/DayPlannerControl';
import DayGridList from '../comps/DayGridList';
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

class DayPlanner extends React.Component{
    constructor(){
		super();
		this.state = {
            Triposo: new Triposo(),
            BudgetYourTrip: new BudgetYourTrip(),
            budgetData:null,
            currency:"",
            pageData: null,
            catDict: [{}],
            address:'',
            noResult:false,
            days: [],
            location: null,
            params: {
                location_id:null,
                items_per_day:null,
                hotel_poi_id:null,
                max_distance:null,
                items_per_day:null,
                start_date:null,
                end_date:null,
                arrival_time:null,
                departure_time:null,
                seed:null,
            }, 
			mounted: false,
        };	
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    onChange(field,value){
        if (field === 'location_id'){
            this.setState({location:value});
        }
        this.setState(prevState => ({
            params: {
                ...prevState.params,
                [field]: value
            }
        }))
    }



	async componentDidMount(){
        //handlesubmit instead
	   //location,hotel_poi='',distance='',items='',start= '' ,end = '',arrival='',departure='',Isseed=false
        const results = await this.state.Triposo.dayPlanner({location_id:'San_Francisco'});		
        this.setState({ pageData: results });
        this.setState({ mounted: true });
        const geoId = await this.state.BudgetYourTrip.getIdByName('San_Francisco');
        if (geoId.status===true){
            var locationID = geoId.data[0].geonameid;
            for(var i = 0; i < geoId.data.length; i++){
                if (geoId.data[i].asciiname === 'San Francisco'){
                    locationID = geoId.data[i].geonameid;
                }
            }
           
            const budgets = await this.state.BudgetYourTrip.getBudgetById(locationID);
            const costs = budgets.data.costs;
            var costArray = [{}];
            for (var i = 0; i < costs.length; i++) {
                const catID = costs[i].category_id;
                const catInfo = this.state.BudgetYourTrip.catDict[catID];
                const costInfo = Object.assign({}, costs[i],catInfo);
                costArray[i] = costInfo;
            }
            const currency = budgets.data.info.currency_code;
            this.setState({budgetData:costArray});
            this.setState({currency:currency});
        }
        // Asynchronously load the Google Maps script, passing in the callback reference
	}

    async handleSubmit() {
    
        try{
            var split = (this.state.location.split(',')[0]).replace(/\s+/g, '_');
            if(split === 'Marrakesh'){
              split = 'Marrakech';
            }
          
            var param = this.state.params;
            param['location_id'] = split;
            var results = await this.state.Triposo.dayPlanner(param);
            
        console.log(this.state.params);
        console.log(results);
        if ('error' in results) {
            console.log("hel")
            var city = (this.state.location.split(',')[0]).replace(/\s+/g, '_');
            var state = (this.state.location.split(',')[1]).trim().replace(/\s+/g, '_');
            state = this.state.Triposo.abbr[state];
            var query = city + '2C_' + state;
            var newParam = this.state.params;
            newParam['location_id'] = query;
            console.log(newParam);
            results = await this.state.Triposo.dayPlanner(newParam);
        }
    
        console.log(this.state.params.location_id);
        this.setState({pageData: results});
        console.log(results);
        
        
        const geoId = await this.state.BudgetYourTrip.getIdByName(split);
        
        if (geoId.status===true){
            var locationID = (geoId.data[0].geonameid).replace('_', ' ');
            for(var i = 0; i < geoId.data.length; i++){
                if (geoId.data[i].asciiname === this.state.params.location_id){
                    locationID = geoId.data[i].geonameid;
                }
            }
        
            const budgets = await this.state.BudgetYourTrip.getBudgetById(locationID);
            const costs = budgets.data.costs;
            var costArray = [{}];
            for (var i = 0; i < costs.length; i++) {
                const catID = costs[i].category_id;
                const catInfo = this.state.BudgetYourTrip.catDict[catID];
                const costInfo = Object.assign({}, costs[i],catInfo);
                costArray[i] = costInfo;
            }
            const currency = budgets.data.info.currency_code;
            console.log(costArray);
            this.setState({budgetData:costArray});
            this.setState({currency:currency});
            
            //data:
            //   "0":{name: "Total Cost", description: "Overall total average cost for this location. Note that these total costs are not a direct sum of all of the category costs, but instead are a specifically calculated amount based on actual travel spending.", sumtype: "0"},
            //"1":{name: "Accommodation", description: "From camping to luxury hotels, costs are for one person and assume double occupancy.", sumtype: "1"},
            
           // costs: Array(12)
           // 0: {category_id: "1", value_budget: "40.072356237598", value_midrange: "110.2374490743", value_luxury: "329.48453001061", geonameid: "5368361"}
          //  1: {category_id: "3", v
          //  console.log(budgets);
        }
        } catch(e) {
            this.setState({noResult:true});
        }
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
	if (this.state.mounted){
        return (
            <div>
                <div class="root">
                    <div class="container">
                    <Row>
                        <Col xs={4} md={3}>
                            <PlannerControl onChange={this.onChange.bind(this)}
                            onSubmit= {this.handleSubmit}/>
                        </Col>
                        <Col xs={8} md={9}>
                            <DayGridList noResult={this.state.noResult} data={this.state.pageData} budget={this.state.budgetData} currency={this.state.currency}  location= {this.state.params.location_id}/>
                        </Col>
                    </Row>
                    </div>
                </div>
            </div>
        );
    } else {
        return(<Loading />);
    }
  }
}

export default DayPlanner
