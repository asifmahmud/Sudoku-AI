import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class TripSummary extends React.Component {
	render(){
		return(
			<div>
				<h3 class="text-left mb-7">Trip Preference</h3>
				<hr/>					
				<SelectField
					floatingLabelText="Budget"
					value={999}
					onChange={() => {}} >
					<MenuItem value={1} primaryText="Lower" />
					<MenuItem value={2} primaryText="Average" />
					<MenuItem value={3} primaryText="Higher" />
				</SelectField>		
				<div>
					<DatePicker hintText="Date of Departure" container="inline" />
					<DatePicker hintText="Date of Return" container="inline" />
					<RaisedButton label="See Suggestions" secondary={true} style={style} />
				</div>
			</div>
		);
	}
}

export default TripSummary;