import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Game from './components/game';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path='/' component={Home}/>
		    <Route path='/game' component={Game}/>
		</div>
	</BrowserRouter>,
	 document.getElementById('root'));