import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
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
			signUpError: '',
			redirect: false
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

		firebase.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPassword)
			.then((user) => {
				this.props.setCurrentUser(user);
				this.setState({ redirect: true });
			})
			.catch(() => {
				this.setState({ logInError: 'Wrong Email or Password' });
			});
	}

	signUp = (event) => {
		event.preventDefault();
		
		if(this.state.userName !== ''){
			if(this.state.signUpPassword === this.state.signUpConfirmPassword){
				if(this.state.signUpPassword.length >= 6 || this.state.signUpConfirmPassword.length >= 6){
					firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
						.then((user) => {
							user.updateProfile({ displayName: this.state.userName });
							this.props.setCurrentUser(user);
							this.setState({ redirect: true });
						})
						.catch(() => {
							this.setState({ signUpError: 'User already exist' });
						});
				} else {
					this.setState({ signUpError: 'Password must be atleast 6 characters' });
				}
			} else {
				this.setState({ signUpError: 'Passwords not matching' });
			}
		} else {
			this.setState({ signUpError: 'Please enter a user name'});
		}
	}

	render(){
		if(this.state.redirect === true){
			return <Redirect to='/directory' /> 
		}
		return(
			<div className="loginContainer">
				<form onSubmit={this.logIn}>
					<Input label="Email" type="email" onChange={this.logInEmailChange}><Icon>mail_outline</Icon></Input>
					<Input label="Password" type="password" onChange={this.logInPasswordChange}><Icon>lock_outline</Icon></Input>
					<div className="btnContainer"><Button>Log in</Button></div>
					<p>{this.state.logInError}</p>
				</form>
				<form onSubmit={this.signUp}>
					<Input label="User name" type="text" onChange={this.userNameChange}><Icon>account_circle</Icon></Input>
					<Input label="Email" type="email" onChange={this.signUpEmailChange}><Icon>mail_outline</Icon></Input>
					<Input label="Password" type="password" onChange={this.signUpPasswordChange}><Icon>lock_outline</Icon></Input>
					<Input label="Confirm Password" type="password" onChange={this.signUpConfirmPasswordChange}><Icon>lock_outline</Icon></Input>
					<div className="btnContainer"><Button>Sign up</Button></div>
					<p>{this.state.signUpError}</p>
				</form>
			</div>
		);
	}
}