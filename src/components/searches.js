import React from 'react';
import Header from './header';
import { Link } from 'react-router-dom';

export default class Searches extends React.Component {

	renderGames = () => {
		return(
			this.props.gameSearches.map((item, index) => {
				return(
					<div key={index}>
						<Link to={{ pathname: '/game', state: { query: item.name} }}>
							<img src={item.box.small} />
						</Link>
						<Link to={{ pathname: '/game', state: { query: item.name} }}><h2>{item.name}</h2></Link>
					</div>
				);
			})
		);
	}

	renderStreams = () => {
		return(
			this.props.streamSearches.map((item, index) => {
				return(
					<div key={index}>
						<img src={item.preview.small} />
						<h2>{item.channel.display_name}</h2>
						<h3>Viewers: {item.viewers}</h3>
						<Link to={{ pathname: '/game', state: { query: item.game} }}><h3>{item.game}</h3></Link>
					</div>
				);
			})
		);
	}

	renderChannels = () => {
		return(
			this.props.channelSearches.map((item, index) => {
				console.log(item);
				return(
					<div key={index}>
						<img src={item.logo} style={{width: '50px', heigth: '50px'}} />
						<h2>{item.display_name}</h2>
					</div>
				);
			})
		);
	}

	render(){
		return(
			<div>
				{this.props.gameSearches.length > 0 && 
					<h1>Games</h1>
				}
				{this.renderGames()}
				{this.props.streamSearches.length > 0 &&
					<h1>Live</h1>
				}
				{this.renderStreams()}
				{this.props.channelSearches.length > 0 &&
					<h1>Channels</h1>
				}
				{this.renderChannels()}
			</div>
		);
	}
}