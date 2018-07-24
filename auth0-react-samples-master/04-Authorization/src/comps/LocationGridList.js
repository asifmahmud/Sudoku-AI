import React from 'react';

import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../css/locationgrid.css';	
const styles = {
	margin:  12,
	icon: {margin:5},
}

class LocationGridList extends React.Component {
	render(){
		return (
			<GridList cellHeight="auto"
							  padding={10}
							  class="gridList">
				<Subheader>Recommended for you</Subheader>
					  {this.props.data.map((tile) => ( 
						<Card className="car-hover">
						 	<Link to={`/location/${tile.title.replace(/ /g, "_")}`}>
							    <CardMedia >
									<GridTile
										key={tile.image}
										title={tile.title}
										subtitle={<span><b>{tile.desc}</b></span>}
										actionIcon={<i class="fa fa-lg fa-info-circle"></i>}
										children={<img src={tile.image} className="imgStyle"/>}
										className="cardImg">
									</GridTile>	
							    </CardMedia>
							</Link>
						    <CardActions>
								<div class="row" style={styles}>
									<h7> Liked or visited:</h7>
								</div>
								<div class="row ml-3">
									<div class="col-md-10">
										{(tile.icons).map((icon) => (
										<Avatar alt="Remy Sharp" src={icon} style={styles.icon}  />
										))}
									</div>
									<div>
									<IconButton class="col-md-2" tooltip="save destination for later" touch={true} tooltipPosition="bottom-right">
      									<ActionGrade/>
    								</IconButton>
									</div>
								</div>
						    </CardActions>
						</Card>
					))}
					
			</GridList>
		);
	}


}

export default LocationGridList;