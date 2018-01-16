import React from 'react';
import axios from 'axios';
import Header from './header';
import { Link } from 'react-router-dom';
import twitchbg from '../images/twitchbg1.jpg';

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

	componentDidUpdate = (prevProps, prevState) => {
		if(prevProps.location.state.query !== this.props.location.state.query){
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
	}

	renderStreams = () => {
		let backgroundImage;
		return(
			this.state.topStreams.map((item, index) => {
				console.log(item.channel.profile_banner);
				if(item.channel.profile_banner === null){
					backgroundImage = {backgroundImage: `url('${twitchbg}')`};
				} else {
					backgroundImage = {backgroundImage: `url('${item.channel.profile_banner}')`};
				}
				return(
					<div key={index} style={backgroundImage} className="streamBox">
						<div className="channelBox">
							<img src={item.channel.logo} className="channelLogo" />
							<Link to={item.channel.url} target="_blank"><h2>{item.channel.display_name}</h2></Link>
							<div className="statsBox">
								<p>Total Views: {item.channel.views}</p>	
								<p>Followers: {item.channel.followers}</p>
							</div>
							<div className="placeholderBox"></div>	
						</div>
						<Link to={item.channel.url} target="_blank">
							<img className="previewImg" src={item.preview.medium} />
						</Link>
						<div className="liveIcon">
							<p className="viewers">{item.viewers}</p>
						</div>
					</div>
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