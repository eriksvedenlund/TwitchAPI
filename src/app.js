import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Game from './components/game';
import Index from './components/index';
import NotFound from './components/notFound';
import './sass/index.scss';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Index}/>
		    <Route path='/game/:id' component={Game}/>
		    <Route path="*" component={NotFound}/>
		</Switch>
	</BrowserRouter>,
	 document.getElementById('root'));