import { axios } from 'axios';
import { API_BASE_URL } from './config';

const axiosAPI = (isAuthenticated) => {
	if (!isAuthenticated)
		return axios.create({
			baseURL: API_BASE_URL,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
			},
		});
};

export default axiosAPI;
