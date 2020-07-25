import axios from 'axios';
import { data, data2 } from './data';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const POPULATE_USER = 'POPULATE_USER';
export const PENDING_ORDERS = 'PENDING_ORDERS';
const url = 'http://google.com';

export const signInAction = (username) => {
	return async (dispatch) => {
		await axios
			.post(url)
			.then(({ data }) => {})
			.catch((e) => {
				const { users } = JSON.parse(data);

				const userExist = users.filter((u) => {
					return u.username === username ? true : false;
				});

				localStorage.setItem('authsession', username);

				if (userExist) {
					dispatch({
						type: SIGN_IN,
						payload: {
							username,
							gtype: userExist[0].gtype,
							isAuthenticated: true,
						},
					});
				}
			})
			.finally(() => {});
	};
};

export const signOutAction = () => {
	return async (dispatch) => {
		await axios
			.get(url)
			.then(({ data }) => {
				const userExist = false;
				localStorage.removeItem('authsession', userExist);

				if (userExist) {
					dispatch({
						type: SIGN_OUT,
						payload: {
							username: null,
							isAuthenticated: false,
						},
					});
				}
			})
			.catch((e) => {
				dispatch({
					type: SIGN_OUT,
					payload: {
						username: null,
						isAuthenticated: false,
					},
				});
			});
	};
};

export const getUsers = () => {
	return async (dispatch) => {
		await axios
			.get(url)
			.then(() => {
				const { users } = JSON.parse(data);

				dispatch({
					type: POPULATE_USER,
					payload: {
						users,
					},
				});
			})
			.catch(() => {
				const { users } = JSON.parse(data);
				dispatch({
					type: POPULATE_USER,
					payload: {
						users,
					},
				});
			});
	};
};

export const getPendingOrders = () => {
	return async (dispatch) => {
		await axios
			.get(url)
			.then(() => {})
			.catch(() => {
				const { pendingorders } = JSON.parse(data2);
				dispatch({
					type: PENDING_ORDERS,
					payload: {
						pendingorders,
					},
				});
			});
	};
};
