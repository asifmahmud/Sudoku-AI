import NavBar from '../comps/NavBar';
import React from 'react';
import Triposo from '../api/Triposo';
import MobileTearSheet from '../comps/MobileTearSheet';
import Post from '../comps/Post';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import zoe from '../assets/zoe.jpg';
import jon from '../assets/jon.jpg';
import joshua from '../assets/joshua.jpg';
import david from '../assets/david.jpg';
import sean from '../assets/sean.jpg';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Posts from "../comps/Posts";
import Pusher from 'pusher-js';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});



const icons =[ zoe, jon, joshua, david, sean ];
const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

class FriendPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			Triposo: new Triposo(),
			pageData: null,
      mounted: false,
    };
    
    this.pusher = new Pusher("0d56ce7f6de4e5484e06", {
      cluster: 'eu',
      encrypted: true
     })
  	}

  componentDidMount(){
    if ('actions' in Notification.prototype) {
      console.log('You can enjoy notification feature');
    } else {
      console.log('Sorry notifications are NOT supported on your browser');
    }
  }

  render(){
    const { isAuthenticated, login } = this.props.auth;
		return(
      <ApolloProvider client={client}>
        <div>
          <div style={styles.row}>
          <MobileTearSheet>
            <List>
              <Subheader>Recent Trips By Friends</Subheader>
								{(icons).map((icon) => (
                    <ListItem
                      primaryText="Brendan Lim"
                      leftAvatar={<Avatar alt="Remy Sharp" src={icon} />}
                      rightIcon={<CommunicationChatBubble />}
                    />							
								))}
            </List>
            <Divider />
            <List>
              <Subheader>All Public Trips</Subheader>
              <ListItem
                primaryText="Chelsea Otakan"
                leftAvatar={<Avatar src="images/chexee-128.jpg" />}
              />
              <ListItem
                primaryText="James Anderson"
                leftAvatar={<Avatar src="images/jsa-128.jpg" />}
              />
            </List>
          </MobileTearSheet>
          <section className="App-main">
          {/* pass the pusher object and apollo to the posts component */}
          <Posts pusher={this.pusher} apollo_client={client}/>
        </section>
        </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default FriendPage;