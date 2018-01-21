import React from 'react';
import firebase from 'firebase';
import LoginForm from './loginForm';
import Home from './home';

export default class Index extends React.Component {
	constructor(){
		super();

		this.state = { loggedIn: null }

		firebase.initializeApp({
		    apiKey: "AIzaSyDFYEPkxUuFCr9XzUXGZd-bW9BfjWRDkhI",
		    authDomain: "twitchapi-ad297.firebaseapp.com",
		    databaseURL: "https://twitchapi-ad297.firebaseio.com",
		    projectId: "twitchapi-ad297",
		    storageBucket: "twitchapi-ad297.appspot.com",
		    messagingSenderId: "82135490189"
		  });

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent = () => {
		if(this.state.loggedIn === true){
			return <Home />;
		} else if(this.state.loggedIn === false){
			return <LoginForm />;
		} else {
			return <div>hold on a minute there playa</div>;
		}
	}

	render(){
		console.log(this.state.loggedIn);
		return(
			<div>
				{this.renderContent()}
			</div>
		);
	}
}