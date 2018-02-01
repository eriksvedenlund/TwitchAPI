import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { Icon } from 'react-materialize';
import twitchbg from '../images/twitchbg1.jpg';
import StreamCard from './streamCard';
import Header from './header';

export default class Searches extends React.Component {
	constructor(){
		super();

		this.state = {channelData: []}
	}

	componentDidMount = () => {
		if(this.props.currentUser){
			firebase.database().ref(`favorites/${this.props.currentUser.uid}`).on('value', (snapshot) => {
				let data = snapshot.val();
				let list = [];
				for(let key in data){
					data[key].id = key;
					list.push(data[key]);
				}
				this.setState({ channelData: list });
			});
		}
	}

	addToFavorites = (profile_banner, logo, url, display_name, views, followers) => {
		let backgroundImage;
		if(profile_banner === null){
			backgroundImage = {backgroundImage: `url('${twitchbg}')`};
		} else {
			backgroundImage = {backgroundImage: `url('${profile_banner}')`};
		}
		firebase.database().ref(`favorites/${this.props.currentUser.uid}`).push({
			background: backgroundImage,
			logo: logo,
			url: url,
			display_name: display_name,
			views: views,
			followers: followers
		});
	}

	removeFromFavorites = (display_name) => {
		const favChannel = this.state.channelData.filter((item) => {
			return item.display_name === display_name;
		})
		const id = favChannel[0].id;
		firebase.database().ref(`favorites/${this.props.currentUser.uid}/${id}`).remove();
	}

	renderGames = () => {
		return(
			this.props.gameSearches.slice(0, 3).map((item, index) => {
				return(
					<Link onClick={this.props.close} key={index} to={{ pathname: `/game/${item.name}`}}>
						<div className="searchGameBox">
								<img src={item.box.medium} />
								<div>
									<p><Icon left>videogame_asset</Icon>{item.name}</p>
									<p><Icon left>visibility</Icon>{item.popularity}</p>
								</div>
						</div>
					</Link>
				);
			})
		);
	}

	renderChannels = () => {
		return(
			this.props.channelSearches.map((item, index) => {
				return(
					<div key={index} className="searchChannelBox">
						<img src={item.logo} className="channelLogo" />
						<div className="statsBox">
							<Link to={item.url} target="_blank"><p><Icon left>account_circle</Icon>{item.display_name}</p></Link>
						</div>
						<div className="statsBox">
							<p><Icon left>visibility</Icon>{item.views}</p>	
							<p><Icon left>favorite</Icon>{item.followers}</p>
						</div>
						{this.state.channelData.some(e => e.display_name === item.display_name) ? (
					        <span onClick={() => this.removeFromFavorites(item.display_name)}><Icon className="heartIcon">favorite</Icon></span>	
					      ) : (
					        <span onClick={() => this.addToFavorites(item.profile_banner, item.logo, item.url, item.display_name, item.views, item.followers)}><Icon className="heartIcon">favorite_border</Icon></span>	
					      )}		
					</div>
				);
			})
		);
	}

	render(){
		return(
			<div className="searchesContainer">
					{this.props.gameSearches.length > 0 && 
						<h5 style={{textAlign: 'center'}}>Games</h5>
					}
					<div className="searchGameContainer">
						{this.renderGames()}
					</div>
					{this.props.channelSearches.length > 0 &&
						<h5 style={{textAlign: 'center'}}>Channels</h5>
					}
					<div className="searchChannelContainer">
						{this.renderChannels()}
					</div>
			</div>
		);
	}
}