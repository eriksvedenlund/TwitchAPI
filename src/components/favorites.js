import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import { Preloader } from 'react-materialize';

export default class Favorites extends React.Component {
	constructor(){
		super();

		this.state = { channelData: [], isLoading: true}
	}

	componentDidMount = () => {
		firebase.database().ref(`favorites/${this.props.currentUser.uid}`).on('value', (snapshot) => {
			let data = snapshot.val();
			let list = [];
			for(let key in data){
				data[key].id = key;
				list.push(data[key]);
			}
			this.setState({ channelData: list, isLoading: false });
		});
	}

	componentWillUnmount = () => {
	  	firebase.database().ref(`favorites/${this.props.currentUser.uid}`).off('value');
	}

	removeFromFavorites = (id) => {
		firebase.database().ref(`favorites/${this.props.currentUser.uid}/${id}`).remove();
	}

	renderChannels = () => {
		return(
			this.state.channelData.map((item, index) => {
				return(
					<div style={item.background} key={index} className="streamBox">
						<div className="overlay"></div>
						<div className="channelBox">
							<img src={item.logo} className="channelLogo" />
							<div className="statsBox">
								<Link to={item.url} target="_blank"><p><Icon left>account_circle</Icon>{item.display_name}</p></Link>
							</div>
							<div className="statsBox">
								<p><Icon left>visibility</Icon>{item.views}</p>	
								<p><Icon left>favorite</Icon>{item.followers}</p>
							</div>
							<span onClick={() => this.removeFromFavorites(item.id)}><Icon className="heartIcon">favorite</Icon></span>	
						</div>
					</div>
				)
			})	
		)
	}

	render(){
		if(this.state.isLoading === true){
			return(
				<div className="loaderContainer"><Preloader size='big' /></div>
			);
		}
		return(
			<div className="streamContainer">
				{this.renderChannels()}
			</div>
		);
	}
}