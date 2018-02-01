import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import { Preloader } from 'react-materialize';
import FavoriteCard from './favoritecard';

export default class Favorites extends React.Component {
	constructor(){
		super();

		this.state = { 
			channelData: [],
			isLoading: true
		}
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
					<FavoriteCard key={index} item={item} removeFromFavorites={this.removeFromFavorites} />
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