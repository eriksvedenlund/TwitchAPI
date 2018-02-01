import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import firebase from 'firebase';

export default class StreamCard extends React.Component {
	constructor(){
		super();

		this.state = {
			icon: 'favorite'
		}
	}

	addToFavorites = () => {
		firebase.database().ref(`favorites/${this.props.currentUser.uid}`).push({
			background: this.props.backgroundImage,
			logo: this.props.item.channel.logo,
			url: this.props.item.channel.url,
			display_name: this.props.item.channel.display_name,
			views: this.props.item.channel.views,
			followers: this.props.item.channel.followers
		});
	}

	removeFromFavorites = () => {
		const favChannel = this.props.channelData.filter((item) => {
			return item.display_name === this.props.item.channel.display_name;
		})
		const id = favChannel[0].id;
		firebase.database().ref(`favorites/${this.props.currentUser.uid}/${id}`).remove();
	}

	changeIcon = () => {
		this.setState({ icon: 'clear' });
	}

	changeIconBack = () => {
		this.setState({ icon: 'favorite' });
	}

	render(){
		return(
			<div style={this.props.backgroundImage} className="streamBox">
				<div className="overlay"></div>
				<div className="channelBox">
					<img src={this.props.item.channel.logo} className="channelLogo" />
					<div className="statsBox">
						<Link to={this.props.item.channel.url} target="_blank"><p><Icon left>account_circle</Icon>{this.props.item.channel.display_name}</p></Link>
						<p><Icon left>videogame_asset</Icon>{this.props.item.game}</p>
					</div>
					<div className="statsBox">
						<p><Icon left>visibility</Icon>{this.props.item.channel.views}</p>	
						<p><Icon left>favorite</Icon>{this.props.item.channel.followers}</p>
					</div>
					{this.props.channelData.some(e => e.display_name === this.props.item.channel.display_name) ? (
				        <span style={{cursor: 'pointer'}} onClick={this.removeFromFavorites} onMouseEnter={this.changeIcon} onMouseLeave={this.changeIconBack}><Icon className="heartIcon">{this.state.icon}</Icon></span>	
				      ) : (
				        <span onClick={this.addToFavorites}><Icon className="heartIcon">favorite_border</Icon></span>	
				      )}	
				</div>
				<div className="previewContainer">
					<Link to={this.props.item.channel.url} target="_blank">
						<img className="previewImg" src={this.props.item.preview.medium} />
					</Link>
				</div>
				<div className="liveIcon">
					<p className="viewers">{this.props.item.viewers}</p>
				</div>
			</div>
		);
	}
}