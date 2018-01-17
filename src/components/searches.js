import React from 'react';
import Header from './header';
import StreamCard from './streamCard';
import { Link } from 'react-router-dom';
import {Icon} from 'react-materialize';
import twitchbg from '../images/twitchbg1.jpg';

export default class Searches extends React.Component {

	renderGames = () => {
		return(
			this.props.gameSearches.slice(0, 3).map((item, index) => {
				return(
					<div key={index} className="searchGameBox">
						<Link onClick={this.props.close} to={{ pathname: `/game/${item.name}`, state: { query: item.name } }}>
							<img src={item.box.medium} />
						</Link>
						<Link onClick={this.props.close} to={{ pathname: `/game/${item.name}`, state: { query: item.name} }}><p>{item.name}</p></Link>
					</div>
				);
			})
		);
	}

	renderStreams = () => {
		let backgroundImage;
		return(
			this.props.streamSearches.map((item, index) => {
				if(item.channel.profile_banner === null){
					backgroundImage = {backgroundImage: `url('${twitchbg}')`};
				} else {
					backgroundImage = {backgroundImage: `url('${item.channel.profile_banner}')`};
				}
				return(
					<StreamCard backgroundImage={backgroundImage} item={item} key={index} />
				);
			})
		);
	}

	renderChannels = () => {
		let backgroundImage;
		return(
			this.props.channelSearches.map((item, index) => {
				if(item.profile_banner === null){
					backgroundImage = {backgroundImage: `url('${twitchbg}')`};
				} else {
					backgroundImage = {backgroundImage: `url('${item.profile_banner}')`};
				}
				return(
					<div style={backgroundImage} key={index} className="streamBox">
						<div className="channelBox">
							<img src={item.logo} className="channelLogo" />
							<div className="statsBox">
								<Link to={item.url} target="_blank"><p>{item.display_name}</p></Link>
							</div>
							<div className="statsBox">
								<p>Total Views: {item.views}</p>	
								<p>Followers: {item.followers}</p>
							</div>
							<Icon className="starIcon">star_border</Icon>	
						</div>
					</div>
				);
			})
		);
	}

	hello = () => {
		console.log("asdasdasd");
	}

	render(){
		if(this.props.gameSearches.length > 0 || this.props.streamSearches.length > 0 || this.props.channelSearches.length > 0) {
			return(
				<div className="searchesContainer">
					<div className="searchesWrapper">
						{this.props.gameSearches.length > 0 ? (
							<span onClick={this.props.close}><Icon className="closeIcon">close</Icon></span>
			            ) : (this.props.streamSearches.length > 0 ? (
			            	<span onClick={this.props.close}><Icon className="closeIcon">close</Icon></span>
			            ) : (this.props.channelSearches.length > 0 ? (
			            	<span onClick={this.props.close}><Icon className="closeIcon">close</Icon></span>
			            ) : (
			            	<div></div>
			            )))}
						{this.props.gameSearches.length > 0 && 
							<h3>Games</h3>
						}
						<div className="searchGameContainer">
							{this.renderGames()}
						</div>
						{this.props.streamSearches.length > 0 &&
							<h3>Live</h3>
						}
						<div className="searchStreamContainer">
							{this.renderStreams()}
						</div>
						{this.props.channelSearches.length > 0 &&
							<h3>Channels</h3>
						}
						<div className="searchChannelContainer">
							{this.renderChannels()}
						</div>
					</div>
				</div>
			);
		}
		else {
			return(
				<div></div>
			);
		}
	}
}