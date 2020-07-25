import axios from 'axios';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

const url = 'http://google.com';

export const signInAction = (username) => {
	return async (dispatch) => {
		await axios
			.post(url)
			.then(({ data }) => {
				const userExist = true;
				localStorage.setItem('authsession', username);

				if (userExist) {
					dispatch({
						type: SIGN_IN,
						payload: {
							username,
							isAuthenticated: true,
						},
					});
				}
			})
			.catch((e) => {
				dispatch({
					type: SIGN_IN,
					payload: {
						username,
						isAuthenticated: true,
					},
				});
			})
			.finally(() => {
				getPendingOrders(username);
			});
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

export const getPendingOrders = (username) => {
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
