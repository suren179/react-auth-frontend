import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<h3>
				Well, this is awkward. The page you're looking for isn't here...
				or never existed!
			</h3>
			<Link to="/">Go back to Home</Link>
		</div>
	);
};

export default NotFound;
