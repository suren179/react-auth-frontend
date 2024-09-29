import instance from './axiosInstance';
import {
	API_URLS,
	ACCESS_TOKEN_LS_KEY,
	REFRESH_TOKEN_LS_KEY,
} from '../common/constants';

export const signUp = async (email: string, name: string, password: string) => {
	const response = await instance.post(API_URLS.signUp, {
		email,
		name,
		password,
	});
	console.info('signUp', response);
	localStorage.setItem(ACCESS_TOKEN_LS_KEY, response?.data?.accessToken);
	localStorage.setItem(REFRESH_TOKEN_LS_KEY, response?.data?.refreshToken);

	return response.data;
};

export const signIn = async (email: string, password: string) => {
	const response = await instance.post(API_URLS.signIn, { email, password });
	console.info('signIn', response.data);
	localStorage.setItem(ACCESS_TOKEN_LS_KEY, response?.data?.accessToken);
	localStorage.setItem(REFRESH_TOKEN_LS_KEY, response?.data?.refreshToken);
	return response.data;
};

export const isTokenValid = async () => {
	const response = await instance.get(API_URLS.auth);
	console.info('fetchUserInfo', response);
	return response.data;
};

export const fetchUserInfo = async () => {
	const response = await instance.get(API_URLS.userInfo);
	console.info('fetchUserInfo', response);
	return response.data;
};
