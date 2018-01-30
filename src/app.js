import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Preloader } from 'react-materialize';
import Directory from './components/directory';
import Game from './components/game';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import Header from './components/header';
import Logout from './components/logout';
import Favorites from './components/favorites';
import './sass/index.scss';

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
	return (
		<Route
		 {...rest}
		 render={(props) => authenticated === true
		 ? <Component {...props} {...rest} />
		 : <Redirect to='/' /> } />
	)
}

export default class App extends Component {
	constructor(){
		super();

		this.state = { 
			loggedIn: null,
			currentUser: null
		}

		if (!firebase.apps.length) {
			firebase.initializeApp({
			    apiKey: "AIzaSyDFYEPkxUuFCr9XzUXGZd-bW9BfjWRDkhI",
			    authDomain: "twitchapi-ad297.firebaseapp.com",
			    databaseURL: "https://twitchapi-ad297.firebaseio.com",
			    projectId: "twitchapi-ad297",
			    storageBucket: "twitchapi-ad297.appspot.com",
			    messagingSenderId: "82135490189"
			  });
		}

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true, currentUser: user });
			} else {
				this.setState({ loggedIn: false, currentUser: null });
			}
		});

	}

	setCurrentUser = (user) => {
		if(user){
			this.setState({
				currentUser: user,
				loggedIn: true
			})
		} else {
			this.setState({
				currentUser: null,
				loggedIn: false
			})
		}
	}

			
	render(){
		if(this.state.loggedIn === null){
			return(
				<div className="loaderContainer"><Preloader size='big' /></div>
			);
		} else {
			return(
				<BrowserRouter>
					<div style={{height: '100%'}}>
						<Header loggedIn={this.state.loggedIn} currentUser={this.state.currentUser}/>
						<Switch>
							<Route exact path='/' render={(props) => {
								return <LoginForm setCurrentUser={this.setCurrentUser} {...props} />
							}} />
						    <PrivateRoute path='/game/:id' currentUser={this.state.currentUser} authenticated={this.state.loggedIn} component={Game}/>
						    <PrivateRoute exact path='/directory' authenticated={this.state.loggedIn} component={Directory}/>
						    <Route path='/logout' component={Logout}/>
						    <Route exact path='/favorites' render={(props) => {
								return <Favorites currentUser={this.state.currentUser} {...props} />
							}} />
						    <Route path="*" component={NotFound}/>
						</Switch>
					</div>
				</BrowserRouter>
			);
		}
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));