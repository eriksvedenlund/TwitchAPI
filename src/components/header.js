import React from 'react';
import axios from 'axios';
import Searches from './searches';

export default class Header extends React.Component {
	constructor(){
		super();

		this.state = {
			gameSearches: [],
			streamSearches: [],
			channelSearches: [],
			inputVal: ''
		}
	}

	search = (event) => {
		event.preventDefault();
		const query = this.state.inputVal;
		if(query){
			const gameUrl = 'https://api.twitch.tv/kraken/search/games?query=' + query + '&type=suggest&live=true'
			axios.get(gameUrl, {
				headers: {
					'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
					}
				})
				.then(res => {
					this.setState({
						gameSearches: res.data.games
					});
				})
			.catch(err => console.error(err));

			const streamUrl = 'https://api.twitch.tv/kraken/search/streams?query=' + query + '&limit=6';
			axios.get(streamUrl, {
				headers: {
		   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
		 			}
		 		})
				.then(res => {
					this.setState({
						streamSearches: res.data.streams
					});
				})
			.catch(err => console.error(err))

			const channelUrl = 'https://api.twitch.tv/kraken/search/channels?query=' + query + '&limit=6';
			axios.get(channelUrl, {
				headers: {
		   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
		 			}
		 		})
				.then(res => {
					this.setState({
						channelSearches: res.data.channels
					});
				})
			.catch(err => console.error(err))
		} else {
			this.setState({
				gameSearches: [],
				streamSearches: [],
				channelSearches: []
			});
		}
	}

	handleChange = (event) => {
		this.setState({ inputVal: event.target.value });
	}

	render(){
		return(
			<div>
				<h1>this is the header</h1>
				<form>
					<input type="text" onChange={this.handleChange}/>
					<button onClick={this.search}>search</button>
				</form>
				<Searches gameSearches={this.state.gameSearches} streamSearches={this.state.streamSearches} channelSearches={this.state.channelSearches}/>
			</div>
		);
	}
}