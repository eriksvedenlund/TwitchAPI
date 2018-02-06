import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

export default class FavoriteCard extends React.Component {
	constructor(){
		super();

		this.state = { icon: 'favorite'}
	}

	changeIcon = () => {
		this.setState({ icon: 'clear' });
	}

	changeIconBack = () => {
		this.setState({ icon: 'favorite' });
	}

	render(){
		return(
			<div style={this.props.item.background} className="favoriteStreamBox">
				<div className="overlay"></div>
				<div className="channelBox">
					<img src={this.props.item.logo} className="channelLogo" />
					<div className="statsBox">
						<Link to={this.props.item.url} target="_blank"><p><Icon left>account_circle</Icon>{this.props.item.display_name}</p></Link>
					</div>
					<div className="statsBox">
						<p><Icon left>visibility</Icon>{this.props.item.views}</p>	
						<p><Icon left>favorite</Icon>{this.props.item.followers}</p>
					</div>
					<span style={{cursor: 'pointer'}} onMouseEnter={this.changeIcon} onMouseLeave={this.changeIconBack} onClick={() => this.props.removeFromFavorites(this.props.item.id)}><Icon className="heartIcon-filled">{this.state.icon}</Icon></span>	
				</div>
			</div>
		);
	}
}