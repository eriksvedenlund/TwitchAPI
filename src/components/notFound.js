import React from 'react';
import BibleThump from '../images/biblethump.png';
import Header from './header';

const notFound = (props) => {
	return(
		<div>
			<Header loggedIn={props.loggedIn} currentUser={props.currentUser}/>
			<div className="notFoundContainer">
				<h2>404: Page not found</h2>
				<img src={BibleThump}/>
			</div>
		</div>
	);
}

export default notFound;