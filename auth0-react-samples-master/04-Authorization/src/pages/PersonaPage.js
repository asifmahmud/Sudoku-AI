import React from 'react';
import Triposo from '../api/Triposo';
import Firebase from '../api/Firebase';
import LocationGridList from '../comps/LocationGridList';
import LocationControls from '../comps/LocationControls';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import CheckboxField from '../comps/Checkbox';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionTheaters from 'material-ui/svg-icons/action/theaters';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import profilepic from '../assets/profilepic.jpg';
import unknownprofile from '../assets/unknown_profile.png';
import travelhistory from '../assets/travelhistory.jpg';
import MobileTearSheet from '../comps/MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import MapDrink from 'material-ui/svg-icons/maps/local-drink';
import MapLandscape from 'material-ui/svg-icons/maps/local-florist';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Auth0 from '../api/Auth0';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const styles = {
  margin: { margin: 12,
    float: 'right',
  },
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  checkboxNested: {
    marginBottom: 16,
    marginLeft: 28,
  },
  datePicker: { 
    marginLeft:15,
  },
  alert:{
    color:'red'
  },
};

class PersonaPage extends React.Component {
  constructor(){
    super();
    this.post = this.post.bind(this);
		this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      open: false,
      checked: false,
      expanded: false,
      loading: false,
      success: false,
			firstSlider: 1,
      secondSlider: 50,
      profile: {},
      Auth0: new Auth0(),
      result: new Set(),  
      preference: {tripTypes:{},hobbies:{},budget_min:0,budget_max:100000000}      
		};	
	}

  post (path, data) {
    console.log("called post");
    return fetch('http://localhost:3001'+path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  adventureList = [{id: 1, category: 'camping', value: 'camping'}];
  foodList =  [{id: 1, category: 'coffee', value: 'coffee'}, {id: 2, category: 'buffet', value: 'buffet'}, {id: 3, category: 'authentic_dining_experience', value: 'authentic dining experience'}];
  artList = [{id: 1, category: 'jazz club', value: 'jazz club'}, {id: 2, category: 'music', value: 'music'}, {id: 3, category: 'museums', value:'museums'}];
      timer = undefined;
      componentWillUnmount() {
        clearTimeout(this.timer);
      }


      componentWillMount() {
        this.setState({ profile: {} });
  
        const { userProfile, getProfile, isAuthenticated, login } = this.props.auth;
        if(isAuthenticated()){
          if (!userProfile) {
            getProfile((err, profile) => {
              this.setState({ profile });
                var username =  this.state.profile.nickname;
                var email =  this.state.profile.email;
                this.post('/api/createUser', {username,email});
            });
          } else {
            this.setState({ profile: userProfile });
            var username =  this.state.profile.nickname;
            var email =  this.state.profile.email;
            this.post('/api/createUser', {username,email});
          }
         
        } else {
          alert('not authenticated');
        }
      }

      handleCheckbox = (event, isChecked, value)  => {
       // event.preventDefault(); 
    
        if(isChecked==true){
          this.state.result.add(value);
          console.log(value+" added");
        } else {
          this.state.result.delete(value);
          console.log(value+" removed");
        }
      }

      handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
      };
    
      handleToggle = (event, toggle) => {
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true,
            },
            () => {
              this.timer = setTimeout(() => {
                this.setState({
                  loading: false,
                  success: true,
                  expanded: toggle
                });
              }, 2000);
            },
          );
        }
      };
    
      handleExpand = () => {
        this.setState({expanded: true});
      };
    
      handleReduce = () => {
        this.setState({expanded: false});
      };

      handleNestedListToggle = (item) => {
          this.setState({
            open: item.state.open,
          });
      };

      handlePreference = () => {
        this.state.Auth0.createPreference('hobbies', this.state.result, 'ib.gaga@hotmail.com');
      }

      handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
      };
      
      handleSecondSlider = (event, value) => {
        this.setState({secondSlider: value});
      };
    
      updatePreference(types, min, max, hobbies ){
        this.setState({
          preference: {tripTypes: types, budget_min: min, budget_max: max, hobbies: hobbies}
        });
      }
   
      updateCheck() {
      this.setState((oldState) => {
        return {
          checked: !oldState.checked,
        };
      });
    }

      

  render() {

    

    const { isAuthenticated, login, getAccessToken} = this.props.auth;
    const { loading, success, profile } = this.state;
    const { classes } = this.props;
    console.log(profile);
  
    return (
        <div>             
          <div class="container">
            <div class="row">
              <RaisedButton label="Save All Changes" primary={true} style={styles.margin} onClick={this.handlePreference.bind(this)}/>
              <RaisedButton label="Discard Changes" secondary={true} style={styles.margin} />
            </div>
                <div class="row">
                    <div class="col-md-4">
                    <div>
                    <br />
                    <MobileTearSheet>
                      <List>
                        <Subheader>Trip Types</Subheader>
                        <div style={styles}>
                            <Checkbox
                            label="Solo"
                            style={styles.checkboxNested}
                              />
                            <Checkbox
                            label="friends"
                            style={styles.checkboxNested}
                            />
                            <Checkbox
                            label="Couple"
                            checked={this.state.checked}
                            onCheck={this.updateCheck.bind(this)}
                            style={styles.checkboxNested}
                            />
                            <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            label="Family with kids"
                            style={styles.checkboxNested}
                            />
                        </div>
                            <Subheader>Trip Preferences</Subheader>
                            <div style={styles}>
                            <p>
                              <span>{'Duration in days: '}</span>
                              <span>{this.state.firstSlider}</span>
                            </p>
                              <Slider  
                                min={1}
                                max={64}
                                step={1}
                                value={this.state.firstSlider} 
                                onChange={this.handleFirstSlider} />
                              <p>
                                <span>{'Budget in USD: '}</span>
                                <span>{this.state.secondSlider}</span>
                              </p>
                                <Slider
                                min={0}
                                max={2000}
                                step={50}
                                value={this.state.secondSlider}
                                onChange={this.handleSecondSlider}
                                />
                          </div>	
                        </List>
                    </MobileTearSheet>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div>
                    <br />
                    <MobileTearSheet>
                      <List>
                        <Subheader>Interests</Subheader>
                        <ListItem
                        primaryText="Adventures" leftIcon={<MapLandscape />} 
                          initiallyOpen={false}
                          primaryTogglesNestedList={true}
                          nestedItems={
                            this.adventureList.map(element => (
                              <CheckboxField
                                key={element.id}
                                label={element.value}  
                                checkedIcon={<ActionFavorite />}
                                category={element.category}
                                uncheckedIcon={<ActionFavoriteBorder />}
                                onChange={this.handleCheckbox}
                                style={styles.checkboxNested}
                              />
                            ))}    
                        />
                        <ListItem
                        primaryText="Food and Drinks" leftIcon={<MapDrink />}
                          initiallyOpen={false}
                          primaryTogglesNestedList={true}
                          nestedItems={
                            this.foodList.map(element => (
                              <CheckboxField
                                key={element.id}
                                label={element.value}  
                                checkedIcon={<ActionFavorite />}
                                category={element.category}
                                uncheckedIcon={<ActionFavoriteBorder />}
                                onChange={this.handleCheckbox}
                                style={styles.checkboxNested}
                              />
                            ))}    
                        />
                        <ListItem
                          primaryText="Arts"
                          leftIcon={<ActionTheaters />}
                          initiallyOpen={true}
                          primaryTogglesNestedList={true}
                          nestedItems={
                            this.artList.map(element => (
                              <CheckboxField
                                key={element.id}
                                label={element.value}  
                                checkedIcon={<ActionFavorite />}
                                category={element.category}
                                uncheckedIcon={<ActionFavoriteBorder />}
                                onChange={this.handleCheckbox}
                                style={styles.checkboxNested}
                              />
                            ))}    
                        />
                      </List>
                    </MobileTearSheet>
                </div>
            </div>
            <div class="col-md-4">
                <div>
                    <br />
                    <MobileTearSheet>
                      <List>
                          <Subheader>My Availabilties</Subheader>
                            <div style={styles.datePicker} >
                              <p> 03/08/2018 - 07/08/2018</p>
                              <DatePicker hintText="Start" container="inline" />
                              <DatePicker hintText="End" container="inline" />
                              <RaisedButton label="Add Availability" primary={true} />
                            </div>
                      </List>
                        <List>
                            <Subheader>My places</Subheader>
                            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        
                            {
              !isAuthenticated() && (
                <CardHeader
                  title='Please login first'
                  style ={styles.alert}
                  avatar={unknownprofile}
                  actAsExpander={true}
                  showExpandableButton={true}
              />
              )}
                  {
              isAuthenticated() && (
      
                <CardHeader
                  title={this.state.profile.name}
                  avatar={this.state.profile.picture}
                  actAsExpander={true}
                  showExpandableButton={true}
                />       
        )}
        
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="Enable location history"
          />
        </CardText>
        {loading && <CircularProgress size={68} />}
        <CardMedia
          expandable={true}
        >
        <img src={travelhistory} alt="travel history" />
       
        </CardMedia>
      </Card>
     

   


      
                            </List>
                        </MobileTearSheet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
  }
}

export default PersonaPage;
