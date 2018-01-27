import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon, Preloader } from 'react-materialize';
import twitchbg from '../images/twitchbg1.jpg';
import StreamCard from './streamCard';
import Header from './header';

export default class Game extends React.Component{
	constructor(){
		super();

		this.state = {
			topStreams: [],
			isLoading: true
		}
	}

	componentDidMount = () => {
		const query = this.props.match.params.id;
		const url = 'https://api.twitch.tv/kraken/streams?game=' + query + '&limit=5';
		axios.get(url, {
			headers: {
	   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
	 			}
	 		})
			.then(res => {
				this.setState({
					topStreams: res.data.streams,
					isLoading: false
				});
			})
		.catch(err => console.error(err))
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.match.params.id !== this.props.match.params.id){
			const query = this.props.match.params.id;
			const url = 'https://api.twitch.tv/kraken/streams?game=' + query + '&limit=5';
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
		if(this.state.isLoading === true){
			return(
				<div className="loaderContainer"><Preloader size='big' /></div>
			);
		} else {
			return(
				<div className="streamContainer">
					{this.renderStreams()}
				</div>
			);
		}
	}
}