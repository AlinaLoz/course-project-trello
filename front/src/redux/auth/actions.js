import {ACTIONS} from "../constans";
import {Xhr} from "../../services/Xhr";

export const fetchLogin = (login, password) => dispatch => {
	dispatch({type: ACTIONS.USER.LOGIN.RQ});

	Xhr.login(login, password).then(resp => {
		dispatch({
			type: ACTIONS.USER.LOGIN.SC,
			data: resp
		})
	}).catch(err => {
		dispatch({
			type: ACTIONS.USER.LOGIN.FL,
			data: err.data
		})
	});
};


export const fetchAuth = () => dispatch => {
	Xhr.auth().then(resp => {
		dispatch({
			type: ACTIONS.USER.AUTH,
			data: resp
		})
	}).catch(err => {
		console.log(err);
	});
};

export const logOut = () => dispatch => {
	Xhr.logout().then(resp => {
		dispatch({
			type: ACTIONS.USER.LOGOUT,
			data: resp
		})
	}).catch(err => {
		console.log(err);
	});
};

export const getAllUsers = (pageNumber) => dispatch => {
	dispatch({type: ACTIONS.USERS.GET_ALL.RQ});
	Xhr.getUsers(pageNumber).then(resp => {
		dispatch({
			type: ACTIONS.USERS.GET_ALL.SC,
			data: resp
		})
	}).catch(err => {
		console.log(err);
		dispatch({
			type: ACTIONS.USERS.GET_ALL.FL,
			data: err
		})
	});
};

export const deleteUser = (pageNumber, id) => dispatch => {
	dispatch({type: ACTIONS.USERS.GET_ALL.RQ});
	Xhr.deleteUser(id, pageNumber).then(resp => {
		dispatch({
			type: ACTIONS.USERS.GET_ALL.SC,
			data: resp
		})
	}).catch(err => {
		console.log(err);
		dispatch({
			type: ACTIONS.USERS.GET_ALL.FL,
			data: err
		})
	});
};


