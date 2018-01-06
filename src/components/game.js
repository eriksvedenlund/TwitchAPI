import React from 'react';
import axios from 'axios';

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

	render(){
		const topStreamsdata = this.state.topStreams.map((item, index) => {
			return(
				<div key={index}>
					<h2>{item.channel.display_name}</h2>
					<p>{item.viewers}</p>
				</div>
			);
		});
		return(
			<div>
				<h1>game page</h1>
				{topStreamsdata}
			</div>
		);
	}
}