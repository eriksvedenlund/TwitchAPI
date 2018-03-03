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
import config from './firebaseConfig';

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
			firebase.initializeApp(config);
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
		console.log(this.state.loggedIn);
		if(this.state.loggedIn === null){
			return(
				<div className="loaderContainer"><Preloader size='big' /></div>
			);
		} else {
			return(
				<BrowserRouter>
					<div style={{height: '100%', background: '#ededed'}}>
						<Switch>
							<Route exact path='/' render={(props) => {
								return <LoginForm loggedIn={this.state.loggedIn} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} {...props} />
							}} />
						    <PrivateRoute path='/game/:id' loggedIn={this.state.loggedIn} authenticated={this.state.loggedIn} currentUser={this.state.currentUser} component={Game}/>
						    <PrivateRoute exact path='/directory' loggedIn={this.state.loggedIn} authenticated={this.state.loggedIn} currentUser={this.state.currentUser} component={Directory}/>
						    <PrivateRoute exact path='/favorites' loggedIn={this.state.loggedIn} authenticated={this.state.loggedIn} currentUser={this.state.currentUser} component={Favorites}/>
						    <Route path='/logout' component={Logout}/>
						    <Route path='*' render={(props) => {
								return <NotFound loggedIn={this.state.loggedIn} currentUser={this.state.currentUser} {...props} />
							}} />
						</Switch>
					</div>
				</BrowserRouter>
			);
		}
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));