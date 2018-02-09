import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { Preloader } from 'react-materialize';
import twitchbg from '../images/twitchbg1.jpg';
import StreamCard from './streamCard';
import Header from './header';

export default class Game extends React.Component{
	constructor(){
		super();

		this.state = {
			topStreams: [],
			isLoading: true,
			channelData: []
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

		const db = firebase.database();
		db.ref(`favorites/${this.props.currentUser.uid}`).on('value', (snapshot) => {
			let data = snapshot.val();
			let list = [];
			for(let key in data){
				data[key].id = key;
				list.push(data[key]);
			}
			this.setState({ channelData: list });
		});
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

	componentWillUnmount = () => {
	  	firebase.database().ref(`favorites/${this.props.currentUser.uid}`).off('value');
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
					<StreamCard channelData={this.state.channelData} currentUser={this.props.currentUser} backgroundImage={backgroundImage} item={item} channel={item.channel} key={index} />
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
				<div>
					<Header loggedIn={this.props.loggedIn} currentUser={this.props.currentUser}/>
					<div className="streamContainer">
						<h4 style={{margin: '10px 0 10px 0'}}>Top Streamers for</h4>
						<h3 style={{margin: '0 0 10px 0', textAlign: 'center'}}>{this.state.topStreams[0].game}</h3>
						{this.renderStreams()}
					</div>
				</div>
			);
		}
	}
}