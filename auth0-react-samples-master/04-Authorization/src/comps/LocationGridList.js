import React from 'react';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../css/locationgrid.css';	
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles = {
	card: {
		maxWidth: 600,
		margin:10,
	  },
	  media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	  },
 
  margin:  12,
  icon: {margin:5},
};

class LocationGridList extends React.Component {
	render(){
        const { classes } = this.props;
		return (
			<GridList cellHeight="auto" padding={10}>
				<Subheader>Cities Good For Surfing</Subheader>
				{this.props.data.map((tile,index)  => 
							<Link to={`/location/${tile.title.replace(/ /g, "_")}`}>
							<Card className={classes.card}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={tile.image}
										title={tile.title}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{tile.title}
										</Typography>
										<Typography component="p">
											{tile.desc}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button size="small" color="primary">
										Share
									</Button>
									<Button size="small" color="primary">
										Learn More
									</Button>
								</CardActions>
					  		</Card>	
						</Link>
					)
			}


				
					
			</GridList>
		);
	}


}

LocationGridList.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(LocationGridList);
