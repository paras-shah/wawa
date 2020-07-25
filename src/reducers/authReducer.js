import { SIGN_IN, SIGN_OUT } from '../actions';

const INITIAL_STATE = {
	username: null,
	isAuthenticated: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				username: action.payload.username,
				isAuthenticated: true,
			};
		case SIGN_OUT:
			return {
				...state,
				username: null,
				isAuthenticated: false,
			};
		default:
			return { ...state };
	}
};
