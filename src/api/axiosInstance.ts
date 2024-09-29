import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { sleep } from '../common/utilities/utils';
import {
	API_URLS,
	ACCESS_TOKEN_LS_KEY,
	REFRESH_TOKEN_LS_KEY,
	ROUTES,
} from '../common/constants';
const BASE_API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
	baseURL: BASE_API_URL,
});

// Flag to avoid infinite loops while we get accessToken from refresh token
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onRefreshed = () => {
	refreshSubscribers.map((callback) => callback());
	refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: () => void) => {
	refreshSubscribers.push(callback);
};

const fetchNewAccessTokenFromRefreshToken = async () => {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_LS_KEY);
	const response = await instance.post(API_URLS.refreshToken, {
		refreshToken,
	});
	console.info('fetchNewAccessTokenFromRefreshToken', response);
	localStorage.setItem(ACCESS_TOKEN_LS_KEY, response?.data?.accessToken);
	return response.data;
};

//Add Authorization Header If Token Present In LS
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN_LS_KEY);
		if (token && !config?.url?.includes(API_URLS.refreshToken)) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

//Handle 401 Errors (Use refresh token to update accessToken and retry original request/s)
instance.interceptors.response.use(
	async (response) => {
		// add delay for dev env
		if (process.env.NODE_ENV === 'development') {
			await sleep(1000);
		}
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!error.config?.url?.includes(API_URLS.refreshToken) &&
			localStorage.getItem(REFRESH_TOKEN_LS_KEY)
		) {
			originalRequest._retry = true;

			if (!isRefreshing) {
				isRefreshing = true;
				try {
					await fetchNewAccessTokenFromRefreshToken();
					onRefreshed();
					isRefreshing = false;
					return instance(originalRequest);
				} catch (err) {
					isRefreshing = false;
					localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
					localStorage.removeItem(REFRESH_TOKEN_LS_KEY);
					window.location.href = ROUTES.home;
					return Promise.reject(err);
				}
			}

			return new Promise((resolve) => {
				addRefreshSubscriber(() => {
					resolve(instance(originalRequest));
				});
			});
		}
		return Promise.reject(error);
	},
);

export default instance;
