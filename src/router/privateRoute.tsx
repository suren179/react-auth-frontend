import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/auth/UserAuthContext';
import Loader from '../common/components/loader';
import { ROUTES } from '../common/constants';

const PrivateRoute: React.FC<{ component: React.FC }> = ({
	component: Component,
}) => {
	const { authenticated, loading } = useUserAuth();

	// Show a loading indicator while checking authentication status
	if (loading) return <Loader />;

	// If authenticated, render the passed component, otherwise redirect to login
	return authenticated ? <Component /> : <Navigate to={ROUTES.signIn} />;
};

export default PrivateRoute;
