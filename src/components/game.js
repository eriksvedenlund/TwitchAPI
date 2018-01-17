import React from 'react';
import axios from 'axios';
import Header from './header';
import StreamCard from './streamCard';
import { Link } from 'react-router-dom';
import twitchbg from '../images/twitchbg1.jpg';
import {Icon} from 'react-materialize';

export default class Game extends React.Component{
	constructor(){
		super();

		this.state = {
			topStreams: []
		}
	}

	componentDidMount = () => {
		const query = this.props.location.state.query;
		const url = 'https://api.twitch.tv/kraken/search/streams?query=' + query + '&limit=5';
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

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.location.state.query !== this.props.location.state.query){
			const query = this.props.location.state.query;
			const url = 'https://api.twitch.tv/kraken/search/streams?query=' + query + '&limit=5';
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
	}

	renderStreams = () => {
		let backgroundImage;
		return(
			this.state.topStreams.map((item, index) => {
				if(item.channel.profile_banner === null){
					backgroundImage = {backgroundImage: `url('${twitchbg}')`};
				} else {
					backgroundImage = {backgroundImage: `url('${item.channel.profile_banner}')`};
				}
				return(
					<StreamCard backgroundImage={backgroundImage} item={item} channel={item.channel} key={index} />
				);
			})
		);
	}

	render(){
		return(
			<div>
				<Header />
				<div className="streamContainer">
					{this.renderStreams()}
				</div>
			</div>
		);
	}
}