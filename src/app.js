import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends React.Component {
	constructor(){
		super();

		this.state = {
			topGames: []
		}
	}

	getStreams = () => {
		const url = 'https://api.twitch.tv/kraken/games/top/'
		axios.get(url, {
			headers: {
	   			'Client-ID': 'aaf1nw0m0glpzetrm6ddc0vto6ll7f'
	 			}
	 		})
			.then(res => {
				this.setState({
					topGames: res.data.top
				});
			})
		.catch(err => console.error(err))
	}

	render() {
		const topGamesData = this.state.topGames.map((item, index) => {
			return(
				<div>
					<p>{item.viewers}</p>
					<p>{item.game.name}</p>
				</div>
			);
		});
		return(
			<div>
				<button onClick={this.getStreams}>Get the stuff</button>
				{topGamesData}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));