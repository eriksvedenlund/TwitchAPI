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
			channelSearches: [],
			inputVal: ''
		}
	}

	search = (event) => {
		const query = event.target.value;
		if(query){
			document.querySelector('.searchesContainer').style.display = 'flex';
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
			document.querySelector('.searchesContainer').style.display = 'none';
			this.setState({
				gameSearches: [],
				channelSearches: []
			});
		}
	}

	close = () => {
		this.setState({
			gameSearches: [],
			channelSearches: []
		});
	}

	render(){
		if(this.props.loggedIn === true){
			return(
				<div>
					<header>
						<Link to='/directory'>Directory</Link>
						<Link to='/favorites'>Favorites</Link>
						<input type="text" placeholder="Search..." onChange={this.search} />
						<div>
							<div className="userName"><Icon left>account_circle</Icon>{this.props.currentUser.displayName}</div>	
							<Link to='/logout'><Button>Sign Out</Button></Link>
						</div>
					</header>
					<Searches close={this.close} gameSearches={this.state.gameSearches} channelSearches={this.state.channelSearches}/>
				</div>
			);
		} else {
			return null;
		}
	}
}