import { useState, useEffect, useCallback, useRef } from 'react';
import { isTokenValid } from '../api';
import { ACCESS_TOKEN_LS_KEY } from '../common/constants';

const useAuth = () => {
	//To handle two calls in strict mode in development
	const initialized = useRef(false);
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const initAuth = useCallback(async () => {
		if (window.localStorage.getItem(ACCESS_TOKEN_LS_KEY)) {
			try {
				await isTokenValid();
				setAuthenticated(true);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!initialized.current) {
			initAuth();
			initialized.current = true;
		}
	}, [initAuth]);

	return { loading, authenticated };
};

export default useAuth;
