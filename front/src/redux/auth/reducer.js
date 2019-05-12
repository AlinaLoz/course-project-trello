import {ACTIONS} from "../constans";

const initState = {
	message: {},
	auth: false,
	token: null,
	name: '',
	role: 'user',
	login: '',
	listUsers: [],
	countRecord: 0
};

export default function auth(state = initState, action) {
	switch (action.type) {
		case ACTIONS.USER.LOGOUT:
			localStorage.setItem('auth', "false");
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			return {...state, auth: false, token: ""};
		case ACTIONS.USER.AUTH: {
			const {auth, name, role, login} = action.data;
			localStorage.setItem('auth', auth);
			return {...state, auth, name, role, login};
		}
		case ACTIONS.USER.LOGIN.RQ:
			return {...state};
		case ACTIONS.USER.LOGIN.SC: {
			const {token, auth, id} = action.data;
			localStorage.setItem('token', token);
			localStorage.setItem('auth', auth);
			localStorage.setItem('id', id);
			return {...state, token, auth, message : {negative: false}};
		}
		case ACTIONS.USER.LOGIN.FL:
			const {data} = action;
			localStorage.removeItem('token');
			localStorage.setItem('auth', "false");
			return {...state, auth: false, message : {negative: true, text: data.message}};
		case ACTIONS.USERS.GET_ALL.SC:{
			const {countRecord, users} = action.data;
			return {...state, countRecord, listUsers: users}
		}
		case ACTIONS.USERS.GET_ALL.FL:{
			return {...state,  message : {negative: true, text: action.data}};
		}
		case ACTIONS.USERS.DROP_USER.SC:{
			const {users, countRecord} = action.data;
			return {...state, listUsers: users, countRecord}
		}
		case ACTIONS.USERS.DROP_USER.FL:{
			return {...state,  message : {negative: true, text: action.data}};
		}
		default:
			return state;
	}
}