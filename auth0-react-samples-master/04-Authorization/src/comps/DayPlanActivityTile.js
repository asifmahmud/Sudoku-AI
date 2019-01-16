import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import GooglePlaces from '../api/GooglePlaces';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import noImage from '../assets/noimagefound.jpeg';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
    },
    name:{
       fontSize:'20px',
       fontWeight: 'bold',
    },
    snippet:{
        fontSize:'15px',
    },
    icon: {
        margin:6
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },

    image: {
        width: 225,
        height: 200,
      },
  });


class DayPlanActivityTile extends React.Component {
  constructor(props){
		super(props);
		this.state = {
      activityInfo: null,
      open:false,
      imgURL:null,
      GooglePlaces: new GooglePlaces(),
      location:'',
      imgLoaded:false,
      imgURLS:[],
      imgIndex:1,
    };
  }

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
		
  };
  

  repeatStringNumTimes = (string, times) => {
    if(times === null) 
      return "";
    if(times === 1) 
      return string;
    else 
      return string + this.repeatStringNumTimes(string, times - 1);
  };
  


  componentWillReceiveProps(nextProps) {
  
    if(this.state.tile != nextProps.data){
			this.setState({tile:nextProps.data});
    }
		if(this.state.location != nextProps.data.name){
			this.setState({ location:nextProps.data.name});
    }
    if(this.state.imgURLS != nextProps.data.image){
      if (nextProps.data.image != null){
        this.setState({ imgURLS:nextProps.data.image});
        this.setState({ imgURL:nextProps.data.image[0].source_url});
      } else {
        this.onError();
      }
    }
    }
    
  componentDidMount() {
    this.setState({tile:this.props.data});
    this.setState({location:this.props.data.name});
    if (this.props.data.image!=null){
      this.setState({imgURLS:this.props.data.image});
      this.setState({imgURL:this.props.data.image[0].source_url});
    } else {
      this.onError();
    }
  }

  //if there are still images, no need to call for more
  //if there are not images left, make a call
  //replace images inside of call
  //if there are still images, and already called, then 
  async onError(){

    if (this.state.imgLoaded === false) {
        if (this.state.imgIndex >= this.state.imgURLS.length){ 
          const searchResult = await this.state.GooglePlaces.urlSearch(this.state.location);
          if (searchResult.status === 'OK'){
            const placeID = searchResult.results[0].place_id;
            const poiResult = await this.state.GooglePlaces.poiSearch(placeID);
            if (poiResult.status === 'OK'){
                try{
                    const photoRef = poiResult.result.photos[0].photo_reference;
                    const poiImage = this.state.GooglePlaces.imgSearch(photoRef,400);
                    const replaced = (poiImage).replace('https://thingproxy.freeboard.io/fetch/','');
                    this.setState({imgURLS:poiResult.result.photos});
                    this.setState({imgIndex:1});
                    this.setState({imgURL: replaced});
                    this.setState({imgLoaded:true});
                } catch(e){
                    console.log(e);
                }
              } else {
                this.setState({imgURL:noImage});
              }
          } else {
            this.setState({imgURL:noImage});
          }
      } else {
        this.setState({imgURL:this.state.imgURLS[this.state.imgIndex].source_url});
        this.setState({imgIndex:this.state.imgIndex+1});
      }
    } else {
      if (this.state.imgIndex > this.state.imgURLS.length){
        this.setState({imgURL:noImage});
      } else {
        try{
          const poiImage = this.state.GooglePlaces.imgSearch(this.state.imgURLS[this.state.imgIndex].photo_reference,400);
          console.log(poiImage);
          const replaced = (poiImage).replace('https://thingproxy.freeboard.io/fetch/','');
          this.setState({imgURL: replaced});
          this.setState({imgIndex:this.state.imgIndex+1});
        } catch(e){
          console.log(e);
      }
      }
    }
  }
  
	render(){
		let tile = this.props.data;
    const { classes } = this.props;
    var price = this.repeatStringNumTimes("$", tile.price);
  

		return(
            <div className={classes.root}>
            	<h3 className={classes.paragraph}> {tile.title} </h3>
				<p className={classes.paragraph}> {tile.desc} </p>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} onError={this.onError.bind(this)} alt="complex" src={this.state.imgURL} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom className={classes.name} variant="subtitle1">
                           {tile.name}
                      </Typography>
                      <Typography gutterBottom className={classes.snippet}>{tile.snippet}</Typography>
                      <Typography color="textSecondary">ID: 1030114</Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{price}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>

	
		);
	}

}


DayPlanActivityTile.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DayPlanActivityTile);
  
