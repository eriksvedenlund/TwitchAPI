import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { Button, Icon, Input, Preloader } from 'react-materialize';
import Header from './header';

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
		this.setState({ logInError: <Preloader size='small' />});
		if(this.state.logInEmail !== '' && this.state.logInPassword !== ''){
			firebase.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPassword)
				.then((user) => {
					this.props.setCurrentUser(user);
					this.setState({ redirect: true });
				})
				.catch(() => {
					this.setState({ logInError: 'Wrong Email or Password' });
				});
		}
		else {
			this.setState({ logInError: 'Please fill out both fields'});
		}
	}

	signUp = (event) => {
		event.preventDefault();
		this.setState({ signUpError: <Preloader size='small' />});
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
			<div className="loginWrapper">
				<Header loggedIn={this.props.loggedIn} currentUser={this.props.currentUser}/>
				<h3 style={{textAlign: 'center', margin: '12px 0'}}>Twitch API Project</h3>
				<div className="loginContainer">
					<form onSubmit={this.logIn}>
						<Input label="Email" type="email" onChange={this.logInEmailChange}><Icon>mail_outline</Icon></Input>
						<Input label="Password" type="password" onChange={this.logInPasswordChange}><Icon>lock_outline</Icon></Input>
						<div className="btnContainer"><Button>Log in</Button></div>
						<div className="errorContainer">{this.state.logInError}</div>
					</form>
					<form onSubmit={this.signUp}>
						<Input label="User name" maxLength="20" type="text" onChange={this.userNameChange}><Icon>account_circle</Icon></Input>
						<Input label="Email" type="email" onChange={this.signUpEmailChange}><Icon>mail_outline</Icon></Input>
						<Input label="Password" type="password" onChange={this.signUpPasswordChange}><Icon>lock_outline</Icon></Input>
						<Input label="Confirm Password" type="password" onChange={this.signUpConfirmPasswordChange}><Icon>lock_outline</Icon></Input>
						<div className="btnContainer"><Button>Sign up</Button></div>
						<div className="errorContainer">{this.state.signUpError}</div>
					</form>
				</div>
			</div>
		);
	}
}