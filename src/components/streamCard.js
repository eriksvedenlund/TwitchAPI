import React from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-materialize';

const StreamCard = (props) => {
	return(
		<div style={props.backgroundImage} className="streamBox">
			<div className="overlay"></div>
			<div className="channelBox">
				<img src={props.item.channel.logo} className="channelLogo" />
				<div className="statsBox">
					<Link to={props.item.channel.url} target="_blank"><p><Icon left>account_circle</Icon>{props.item.channel.display_name}</p></Link>
					<p><Icon left>videogame_asset</Icon>{props.item.game}</p>
				</div>
				<div className="statsBox">
					<p><Icon left>visibility</Icon>{props.item.channel.views}</p>	
					<p><Icon left>favorite</Icon>{props.item.channel.followers}</p>
				</div>
				<Icon className="heartIcon">favorite_border</Icon>	
			</div>
			<div className="previewContainer">
				<Link to={props.item.channel.url} target="_blank">
					<img className="previewImg" src={props.item.preview.medium} />
				</Link>
			</div>
			<div className="liveIcon">
				<p className="viewers">{props.item.viewers}</p>
			</div>
		</div>
	);
}

export default StreamCard;