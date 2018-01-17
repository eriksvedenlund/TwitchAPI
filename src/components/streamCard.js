import React from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'react-materialize';

const StreamCard = (props) => {
	return(
		<div style={props.backgroundImage} className="streamBox">
			<div className="channelBox">
				<img src={props.item.channel.logo} className="channelLogo" />
				<div className="statsBox">
					<Link to={props.item.channel.url} target="_blank"><p>{props.item.channel.display_name}</p></Link>
					<p>Playing: {props.item.game}</p>
				</div>
				<div className="statsBox">
					<p>Total Views: {props.item.channel.views}</p>	
					<p>Followers: {props.item.channel.followers}</p>
				</div>
				<Icon className="starIcon">star_border</Icon>	
			</div>
			<Link to={props.item.channel.url} target="_blank">
				<img className="previewImg" src={props.item.preview.medium} />
			</Link>
			<div className="liveIcon">
				<p className="viewers">{props.item.viewers}</p>
			</div>
		</div>
	);
}

export default StreamCard;