import React from 'react';
import firebase from 'firebase';
import { Button, Icon, Input } from 'react-materialize';

export default class LoginForm extends React.Component {
	constructor(){
		super();

		this.state = {
			userName: '',
			logInEmail: '',
			logInPassword: '',
			logInError: '',
			signUpEmail: '',
			signUpPassword: '',
			signUpConfirmPassword: '',
			logInError: '',
			signUpError: ''
		}
	}

	logInEmailChange = (event) => {
		this.setState({ logInEmail: event.target.value });
	}

	logInPasswordChange = (event) => {
		this.setState({ logInPassword: event.target.value });
	}

	signUpEmailChange = (event) => {
		this.setState({ signUpEmail: event.target.value });
	}

	signUpPasswordChange = (event) => {
		this.setState({ signUpPassword: event.target.value });
	}

	signUpConfirmPasswordChange = (event) => {
		this.setState({ signUpConfirmPassword: event.target.value });
	}

	userNameChange = (event) => {
		this.setState({ userName: event.target.value });
	}

	logIn = (event) => {
		event.preventDefault();

		// this.setState({ logInError: '' });

		firebase.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPassword)
			.then(() => console.log("logged in succesful"))
			.catch(() => {
				this.setState({ logInError: 'Wrong Email or Password' });
			});
	}

	signUp = (event) => {
		event.preventDefault();
		
		// this.setState({ signUpError: '' });

		if(this.state.signUpPassword === this.state.signUpConfirmPassword){
			firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
				.then((user) => {
					user.updateProfile({ displayName: this.state.userName });
				})
				.catch(() => {
					this.setState({ signUpError: 'User already exist' });
				});
		} else {
			this.setState({ signUpError: 'Passwords not matching' });
		}
	}

	render(){
		return(
			<div className="loginContainer">
				<form onSubmit={this.logIn}>
					<Input label="Email" placeholder="contact@example.com" type="email" onChange={this.logInEmailChange}><Icon>account_circle</Icon></Input>
					<Input label="Password" type="password" onChange={this.logInPasswordChange}><Icon>lock_outline</Icon></Input>
					<div className="btnContainer"><Button>Log in</Button></div>
					<p>{this.state.logInError}</p>
				</form>
				<form onSubmit={this.signUp}>
					<Input label="User Name" type="text" onChange={this.userNameChange}><Icon>account_circle</Icon></Input>
					<Input label="Email" type="email" placeholder="contact@example.com" onChange={this.signUpEmailChange}><Icon>account_circle</Icon></Input>
					<Input label="Password" type="password" onChange={this.signUpPasswordChange}><Icon>lock_outline</Icon></Input>
					<Input label="Confirm Password" type="password" onChange={this.signUpConfirmPasswordChange}><Icon>lock_outline</Icon></Input>
					<div className="btnContainer"><Button>Sign up</Button></div>
					<p>{this.state.signUpError}</p>
				</form>
			</div>
		);
	}
}