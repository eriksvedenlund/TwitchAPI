import React from 'react';

export default class Game extends React.Component{
	render(){
		console.log(this.props.location.state.query);
		return(
			<div>i am game</div>
		);
	}
}