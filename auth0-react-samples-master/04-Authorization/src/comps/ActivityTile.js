import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Fab from '@material-ui/core/Fab';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
import face from '../assets/goodface.jpg';
import TextField from 'material-ui/TextField';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import ActionGrade from 'material-ui/svg-icons/action/grade';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = theme => ({
	border:{
		margin:6,
	},
	card: {
	  maxWidth: 600,
	  margin:10,
	},
	media: {
	  height: 0,
	  paddingTop: '56.25%', // 16:9
	},
	actions: {
	  display: 'flex',
	},
	expand: {
	  transform: 'rotate(0deg)',
	  marginLeft: 'auto',
	  transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
	  transform: 'rotate(180deg)',
	},
	avatar: {
	  backgroundColor: red[500],
	},
	name: {fontWeight: 'bold'},
  });

class ActivityTile extends React.Component {
	state = {
		activityInfo: this.props.data,
		open:false,
		expanded: false,
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
	
	
	  handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	  };
	render(){
		let tile = this.props.data;
		const { classes } = this.props;

		return(
			
			<Card className={classes.card}>
			<CardHeader
			  action={
				<IconButton aria-label="Share">
					<ShareIcon />
				</IconButton>
			  }
			  title={tile.name}
			 // subheader="September 14, 2016"
			/>
			<CardMedia
			  className={classes.media}
			  image={tile.image}
			  title={tile.name}
			/>
			<CardContent>
			  <Typography component="p">
				{tile.desc}
			  </Typography>
			</CardContent>
			<CardActions className={classes.actions} disableActionSpacing>
				<IconButton tooltip="save for later" touch={true} tooltipPosition="bottom-left">
					<ActionGrade/>
				</IconButton>		
				<Fab size="small"  color="#00bcd4" onClick={this.getInfo.bind(this)}>
					<ContentAdd />
				</Fab>
				<RaisedButton className={classes.border}
					size="small"
					onClick={this.handleClick}
					label="Hours"
				/>	
			   <Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
			   >
						   <p zDepth={3}>
							   M: {tile.mon_open} - {tile.mon_close} <br/>
							   Tu: {tile.tue_open} - {tile.tue_close} <br/>
							   W: {tile.wed_open} - {tile.wed_close} <br/>
							   Th: {tile.thu_open} - {tile.thu_close} <br/>
							   F: {tile.fri_open} - {tile.fri_close} <br/>
							   Sat: {tile.sat_open} - {tile.sat_close} <br/>
							   Sun: {tile.sat_open} - {tile.sun_close} <br/>
						   </p>
			   </Popover>
			  <IconButton
				className={classnames(classes.expand, {
				  [classes.expandOpen]: this.state.expanded,
				})}
				onClick={this.handleExpandClick}
				aria-expanded={this.state.expanded}
				aria-label="Show more"
			  >
				<ExpandMoreIcon />
			  </IconButton>
			  
			</CardActions>
			<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
			  <CardContent>
				<Typography paragraph>Method:</Typography>
				<Typography paragraph>
				  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
				  minutes.
				</Typography>
				<Typography paragraph>
				  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
				  heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
				  browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
				  chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
				  salt and pepper, and cook, stirring often until thickened and fragrant, about 10
				  minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				</Typography>
				<Typography paragraph>
				  Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
				  without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
				  to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
				  cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
				  minutes more. (Discard any mussels that don’t open.)
				</Typography>
				<Typography>
				  Set aside off of the heat to let rest for 10 minutes, and then serve.
				</Typography>
			  </CardContent>
			</Collapse>
		  </Card>

			

		
		);
	}

}


ActivityTile.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ActivityTile);