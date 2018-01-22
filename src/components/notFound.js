import React from 'react';
import BibleThump from '../images/biblethump.jpg'

const notFound = () => {
	return(
		<div className="notFoundContainer">
			<h2>404: Page not found</h2>
			<img src={BibleThump}/>
		</div>
	);
}

export default notFound;