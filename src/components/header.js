import React from 'react';
import axios from 'axios';
import {Button, Icon} from 'react-materialize';
import { Link } from 'react-router-dom';
import Searches from './searches';
import firebase from 'firebase';

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

			const streamUrl = 'https://api.twitch.tv/kraken/streams?game=' + query + '&limit=3';
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

			const channelUrl = 'https://api.twitch.tv/kraken/search/channels?query=' + query + '&limit=2';
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

	close = () => {
		this.setState({
			gameSearches: [],
			streamSearches: [],
			channelSearches: []
		});
	}

	render(){
		return(
			<div>
				<header>
					<form>
						<input type="text" onChange={this.handleChange}/>
						<Button waves='light' onClick={this.search}>search<Icon right>search</Icon></Button>
					</form>
					<div>
						{this.props.loggedIn &&
							<h5><Icon left>account_circle</Icon>{this.props.currentUser.displayName}</h5>	
						}
						<Link to='/logout'><Button>Sign Out</Button></Link>
						<Link to='/home'><Button>Home</Button></Link>
					</div>
				</header>
				<Searches close={this.close} gameSearches={this.state.gameSearches} streamSearches={this.state.streamSearches} channelSearches={this.state.channelSearches}/>
			</div>
		);
	}
}