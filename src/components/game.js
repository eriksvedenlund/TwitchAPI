import React from 'react';
import axios from 'axios';
import Header from './header';
import { Link } from 'react-router-dom';

export default class Game extends React.Component{
	constructor(){
		super();

		this.state = {
			topStreams: []
		}
	}

	componentDidMount = () => {
		const query = this.props.location.state.query;
		const url = 'https://api.twitch.tv/kraken/search/streams?query=' + query;
		axios.get(url, {
			headers: {
	   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
	 			}
	 		})
			.then(res => {
				this.setState({
					topStreams: res.data.streams
				});
			})
		.catch(err => console.error(err))
	}

	renderStreams = () => {
		return(
			this.state.topStreams.map((item, index) => {
				console.log(item);
				return(
					<div key={index}>
						<Link to={item.channel.url} target="_blank">
							<img src={item.preview.medium} />
						</Link>
						<Link to={item.channel.url} target="_blank"><h2>{item.channel.display_name}</h2></Link>
						<p>Viewers: {item.viewers}</p>
					</div>
				);
			})
		);
	}

	render(){
		return(
			<div>
				<Header />
				<h1>game page</h1>
				{this.renderStreams()}
			</div>
		);
	}
}