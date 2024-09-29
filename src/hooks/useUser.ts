import { useState, useEffect, useRef } from 'react';
import { fetchUserInfo } from '../api';

const useUser = () => {
	//To handle two calls in strict mode in development
	const initialized = useRef(false);
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>(null);

	const initializeUserInfo = async () => {
		try {
			const userInfoResponse = await fetchUserInfo();
			setData(userInfoResponse);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!initialized.current) {
			initializeUserInfo();
			initialized.current = true;
		}
	}, []);

	return { loading, data, error };
};

export default useUser;
