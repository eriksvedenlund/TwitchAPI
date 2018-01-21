import React from 'react';
import firebase from 'firebase';

export default class LoginForm extends React.Component {
	constructor(){
		super();

		this.state = {
			signInEmail: '',
			signInPassword: '',
			signInError: '',
			signUpEmail: '',
			signUpPassword: '',
			signUpError: ''
		}
	}

	signInEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	signInPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	signUpEmailChange = (event) => {
		this.setState({ signUpEmail: event.target.value });
	}

	signUpPasswordChange = (event) => {
		this.setState({ signUpPassword: event.target.value });
	}

	logIn = (event) => {
		event.preventDefault();

		// this.setState({ signInError: '' });

		firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPassword)
			.then(() => console.log("logged in succesful"))
			.catch((error) => console.log("login fail" + error))
	}

	signUp = (event) => {
		event.preventDefault();

		firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
			.then(() => console.log("created user, signed in"))
			.catch(() => console.log("failed to sign up"))
	}

	render(){
		return(
			<div>
				<form onSubmit={this.logIn}>
					<input type="email" onChange={this.signInEmailChange} />
					<input type="password" onChange={this.signInPasswordChange} />
					<button>Log in</button>
					<p>{this.state.error}</p>
				</form>
				<form onSubmit={this.signUp}>
					<input type="email" onChange={this.signUpEmailChange} />
					<input type="password" onChange={this.signUpPasswordChange} />
					<button>Sign up</button>
				</form>
			</div>
		);
	}
}