import React from 'react';
import Header from './header';

export default class Searches extends React.Component {

	renderGames = () => {
		return(
			this.props.gameSearches.map((item, index) => {
				return(
					<div key={index}>
						<h2>{item.name}</h2>
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
						<h2>{item.channel.display_name}</h2>
						<h3>{item.viewers}</h3>
						<h3>{item.game}</h3>
					</div>
				);
			})
		);
	}

	renderChannels = () => {
		return(
			this.props.channelSearches.map((item, index) => {
				return(
					<div key={index}>
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