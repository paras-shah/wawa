import { SIGN_IN, PENDING_ORDERS, SIGN_OUT, POPULATE_USER } from '../actions';

const INITIAL_STATE = {
	username: null,
	isAuthenticated: false,
	users: null,
	gtype: null,
	pendingorders: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				username: action.payload.username,
				gtype: action.payload.gtype,
				isAuthenticated: true,
			};
		case SIGN_OUT:
			return {
				...state,
				username: null,
				isAuthenticated: false,
			};
		case POPULATE_USER:
			return {
				...state,
				users: action.payload.users,
			};
		case PENDING_ORDERS:
			return {
				...state,
				pendingorders: action.payload.pendingorders,
			};
		default:
			return { ...state };
	}
};
