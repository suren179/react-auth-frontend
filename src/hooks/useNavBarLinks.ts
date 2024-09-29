import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/auth/UserAuthContext';
import {
	ACCESS_TOKEN_LS_KEY,
	REFRESH_TOKEN_LS_KEY,
	ROUTES,
} from '../common/constants';

const useNavBarLinks = () => {
	const navigate = useNavigate();
	const { authenticated } = useUserAuth();
	const signOut = () => {
		localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
		localStorage.removeItem(REFRESH_TOKEN_LS_KEY);
		window.location.href = ROUTES.home;
	};

	const navBarLeftLinks = useMemo(() => {
		if (authenticated) {
			return [
				{
					id: 'dashboard',
					pathname: ROUTES.dashboard,
					text: 'Dashboard',
				},
				{
					id: 'profile',
					pathname: ROUTES.profile,
					text: 'Profile',
				},
			];
		} else {
			return [];
		}
	}, [authenticated]);

	const navBarRightLink = useMemo(() => {
		if (authenticated) {
			return [
				{
					id: 'signOut',
					text: 'Sign Out',
					variant: 'contained',
					color: 'primary',
					onClick: signOut,
				},
			];
		} else {
			return [
				{
					id: 'signIn',
					text: 'Sign In',
					variant: 'text',
					color: 'primary',
					onClick: () => {
						navigate(ROUTES.signIn);
					},
				},
				{
					id: 'signUp',
					text: 'Sign Up',
					variant: 'contained',
					color: 'primary',
					onClick: () => {
						navigate(ROUTES.signUp);
					},
				},
			];
		}
	}, [authenticated, navigate]);

	return {
		navBarLeftLinks,
		navBarRightLink,
	};
};

export default useNavBarLinks;
