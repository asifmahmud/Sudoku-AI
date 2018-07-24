import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardMedia, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import face from '../assets/goodface.jpg';
import TextField from 'material-ui/TextField';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const styles = {
	margin:  12,
	icon: {margin:6}
  }
;


class ActivityTile extends React.Component {
	state = {
		activityInfo: this.props.data,
		open:false,
	};

	handleClick = (event) => {
		event.preventDefault();
		this.setState({
		  open: true,
		  anchorEl: event.currentTarget,
		});
	};

	handleActionClick = () => {
		this.setState({
		  open: false,
		});
		alert('Event removed from your calendar.');
	};
	
	

	handleRequestClose = () => {
		this.setState({
		  open: false,
		});
	};


	
	getInfo(){
		return this.props.getActivity(this.state.activityInfo);
		
	}


	render(){
		let tile = this.props.data;
        const style = {

		};

		return(
			<Card className="activity-card card-hover">
			   	<CardMedia>
					<GridTile
						key={tile.image}
						title={tile.name}
						subtitle = {<span><div>
						</div>
						<b>{tile.desc}</b></span>
						}
						className="cardImg"
						children={<img src={tile.image} className="imgStyle"/>}
						actionIcon={<i  class="fa fa-lg fa-info-circle"></i>}
						titleStyle={this.props.styles.titleStyle}
						titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)" >
					</GridTile>
			   </CardMedia> 
		    <CardActions>
		 	
			   <div class="row" style={styles.icon}>
			 
							<RaisedButton
							onClick={this.handleClick}
							label="Hours" />
					
							<IconButton tooltip="save event for later" touch={true} tooltipPosition="bottom-left">
									<ActionGrade/>
								</IconButton>		
								<FloatingActionButton mini={true}  onClick={this.getInfo.bind(this)}>
									<ContentAdd />
								</FloatingActionButton>
					
			   	</div>

		
				<div class="container">
			   		<h7>liked or visited:</h7>
					   {(tile.icons).map((icon) => (
										<Avatar alt="Remy Sharp" src={icon} style={styles.icon}  />
						))}
							   		
			   </div>
			

			   <Popover
			   open={this.state.open}
			   anchorEl={this.state.anchorEl}
			   anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			   targetOrigin={{horizontal: 'left', vertical: 'top'}}
			   onRequestClose={this.handleRequestClose}
			   animation={PopoverAnimationVertical}
			   >

						   <p style={style} zDepth={3}>
							   M: {tile.mon_open} - {tile.mon_close} <br/>
							   Tu: {tile.tue_open} - {tile.tue_close} <br/>
							   W: {tile.wed_open} - {tile.wed_close} <br/>
							   Th: {tile.thu_open} - {tile.thu_close} <br/>
							   F: {tile.fri_open} - {tile.fri_close} <br/>
							   Sat: {tile.sat_open} - {tile.sat_close} <br/>
							   Sun: {tile.sat_open} - {tile.sun_close} <br/>
						   </p>
			   </Popover>
		   </CardActions>
	   </Card>

		);
	}

}

export default ActivityTile;