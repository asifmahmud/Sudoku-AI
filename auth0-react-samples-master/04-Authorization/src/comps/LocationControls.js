import React from 'react';
import Slider from 'material-ui/Slider';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class LocationControls extends React.Component {
	render(){
		const style = {
			margin: 12,
		};
		return(
			<div>
			  <h3 class="text-left mb-7">Trip Preference</h3>
				<hr/>					
				<p>
          <span>{'Budget in USD: '}</span>
          <span>{this.props.secondSlider}</span>
        </p>
				<Slider
				  min={0}
				  max={100000}
				  step={1}
				  value={this.props.secondSlider}
					onChange={this.handleSecondSlider}
				/>
				<div>
					<DatePicker hintText="Date of Departure" container="inline" />
					<DatePicker hintText="Date of Return" container="inline" />
				</div>
				<RaisedButton label="See Suggestions" primary={true} style={style} />
	  		</div>	
		);
	}
}

export default LocationControls;