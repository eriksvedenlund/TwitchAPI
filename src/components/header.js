import React from 'react';
import axios from 'axios';
import {Button, Icon, SideNav, SideNavItem} from 'react-materialize';
import { Link, NavLink } from 'react-router-dom';
import Searches from './searches';
import firebase from 'firebase';
import pac from '../images/pac.jpg';

export default class Header extends React.Component {
	constructor(){
		super();

		this.state = {
			gameSearches: [],
			channelSearches: [],
			inputVal: '',
			width: window.innerWidth
		}
	}

	componentDidMount = () => {
		window.addEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({width: window.innerWidth});
	}

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.updateDimensions);
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
					{this.state.width < 815 ? (
						<div>
						<SideNav
							trigger={<div className="burgerMenu"><Icon>menu</Icon></div>}
							options={{ closeOnClick: true }}
							>
							<SideNavItem userView
								user={{
									background: pac,
									name: this.props.currentUser.displayName,
								}}
							/>
							<NavLink activeStyle={{fontSize: '20px'}} to='/directory'>Directory</NavLink>
							<NavLink activeStyle={{fontSize: '20px'}} to='/favorites'>Favorites</NavLink>
							<SideNavItem divider />
							<Link to='/logout'><Button>Sign Out</Button></Link>
						</SideNav>
						<header>
							<input type="text" className="searchInput" placeholder="Search..." onChange={this.search} />
						</header>
						</div>
						) : (
						<header>
							<NavLink className="navLink" activeStyle={{borderBottom: '2px solid black'}} to='/directory'>Directory</NavLink>
							<NavLink className="navLink" activeStyle={{borderBottom: '2px solid black'}} to='/favorites'>Favorites</NavLink>
							<input type="text" className="searchInput" placeholder="Search..." onChange={this.search} />
							<div>
								<div className="userName"><Icon left>account_circle</Icon>{this.props.currentUser.displayName}</div>	
								<Link to='/logout'><Button>Sign Out</Button></Link>
							</div>
						</header>
						)}
						<Searches close={this.close} currentUser={this.props.currentUser} gameSearches={this.state.gameSearches} channelSearches={this.state.channelSearches}/>
					</div>
				);
		} else {
			return null;
		}
	}
}