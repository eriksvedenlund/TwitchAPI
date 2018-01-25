import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

export default class Logout extends React.Component {
	constructor(){
		super();

		this.state = {
			redirect: false
		}

		firebase.auth().signOut()
			.then(() => {
				this.setState({ redirect: true });
			})
	}

	render(){
		if(this.state.redirect === true){
			return <Redirect to='/' />
		}
		return(
			<div></div>
		);
	}
}