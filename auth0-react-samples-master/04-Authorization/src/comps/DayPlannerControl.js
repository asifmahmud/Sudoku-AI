import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GeoLocation from '../api/GeoLocation';


/*Location *Hotel Nearby (optional) *start date* end date *items per day (optional)*/

function toSuggestArray (arr){
    var suggestions = [];
    loop: { 
        for(var i=0; i<arr.length; i++) {
          suggestions.push({label: arr[i]});
        }
    }
    return suggestions
}

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}


function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);
 
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    display: 'inline-block',
    marginTop: 20,
    width:225,
    background: 'white',
    padding:0,
    border:0
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input:{
    fontSize: 17,
  },
});


class DayPlannerControl extends React.Component {
    state = { 
        GeoLocation: new GeoLocation(),
        value: '', 
        suggestions: [],
    }
  
    handleSuggestionsFetchRequested = async ({ value }) => {
        if(value.length>=3){
          const suggestionsList = await this.state.GeoLocation.getGeoLocation(value);
          this.setState({suggestions: toSuggestArray(suggestionsList)});
        }
      };
    
      handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
      };
    
      handleCityChange = (event, { newValue }) => {
        this.setState({
          value: newValue,
        });
       
        this.props.onChange('location_id',newValue);
      };
    
      onKeyDown(e) {
        if (e.keyCode === 13) { 
           this.props.onSubmit();
        }
     }


     handleDepartDate = (event, newValue) =>{
       var date = new Date(newValue);
       var pDate = date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' +  date.getDate();
        this.props.onChange('start_date',pDate);
      };
      
      handleReturnDate = (event, newValue) =>{
        var date = new Date(newValue);
        var pDate = date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' +  date.getDate();
        this.props.onChange('end_date',pDate);
      };

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
      };
      

  
      
	render(){
        const { classes } = this.props;
        const { value, suggestions } = this.state;
		return(
			<div class="text-left mr-8">
				<h3 class="text-left mb-7">Day Plan</h3>
				<hr/>					
                    <div>
                        <Autosuggest
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderInputComponent={renderInput}
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                            renderSuggestionsContainer={renderSuggestionsContainer}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                placeholder: 'Enter City',
                                value: this.state.value,
                                onChange: this.handleCityChange,
                                classes: {input: this.props.classes['input']}
                            }}
                        />
                        <DatePicker dateFormat="YYYY-MM-DD" hintText="Date of Departure" container="inline" onChange={ this.handleDepartDate.bind(this) }/>
                        <DatePicker dateFormat="YYYY-MM-DD" hintText="Date of Return" container="inline" onChange={ this.handleReturnDate.bind(this) } />
                    </div>
                    <RaisedButton label="Generate Day Plan" onClick={this.handleSubmit} secondary={true} style = {
                        {
                            fontSize: '15px'
                    }} />
			</div>
		);
	}
}

DayPlannerControl.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DayPlannerControl);
