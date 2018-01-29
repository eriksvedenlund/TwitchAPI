import React from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-materialize';
import twitchbg from '../images/twitchbg1.jpg';
import StreamCard from './streamCard';
import Header from './header';

export default class Searches extends React.Component {

	renderGames = () => {
		return(
			this.props.gameSearches.slice(0, 3).map((item, index) => {
				console.log(item);
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
		let backgroundImage;
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
						<Icon className="heartIcon">favorite_border</Icon>	
					</div>
				);
			})
		);
	}

	render(){
		// if(this.props.gameSearches.length > 0 || this.props.channelSearches.length > 0) {
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
		// }
		// else {
		// 	return(
		// 		null
		// 	);
		// }
	}
}