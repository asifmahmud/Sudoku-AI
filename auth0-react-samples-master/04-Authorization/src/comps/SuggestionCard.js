import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class SuggestionCard extends React.Component {
	render(){
		return(
			<Card>
			    <CardHeader
			      title="Without Avatar"
			      subtitle="Subtitle"
			      actAsExpander={true}
			      showExpandableButton={true} />
			    <CardActions>
			      <FlatButton label="See details" />
			      <FlatButton label="Add to Calendar" />
			    </CardActions>
			    <CardText expandable={true}>
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
			</Card>
		);
	}
}

export default SuggestionCard;