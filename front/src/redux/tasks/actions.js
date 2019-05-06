import {ACTIONS} from "../constans";
import {Xhr} from "../../services/Xhr";

export const getTasksByIdList = (idList) => async dispatch => {
	try {
		dispatch({type: ACTIONS.TASK.GET.RQ});
		const data = await Xhr.getTasks(idList);
		dispatch({
			type: ACTIONS.TASK.GET.SC,
			idList,
			data
		})
	} catch (err) {
		dispatch({
			type: ACTIONS.TASK.GET.FL,
			data: err.message
		});
	}
};

// export const deleteTask = (taskId) => dispatch => {
// 	dispatch({type: ACTIONS.TASK.REMOVE.RQ});
//
// 	Xhr.removeTask(localStorage.getItem('auth'), taskId).then(resp => {
// 		dispatch({
// 			type: ACTIONS.TASK.REMOVE.SC,
// 			data: resp.data
// 		})
// 	}).catch(err => {
// 		dispatch({
// 			type: ACTIONS.TASK.REMOVE.FL,
// 			data: err
// 		})
// 	});
// };

export const createTask = (theme, text, idList) => async dispatch => {
	try {
		dispatch({type: ACTIONS.TASK.ADD.RQ});
		const data = await Xhr.createTask(theme, text, idList);
		dispatch({
			type: ACTIONS.TASK.ADD.SC,
			idList,
			data
		})
	} catch (err) {
		dispatch({
			type: ACTIONS.TASK.ADD.FL,
			data: err.message
		});
	}
};

export const updateTask = (theme, text, id) => async dispatch => {
	console.log(theme, text, id);

	try {
		dispatch({type: ACTIONS.TASK.CHANGE.RQ});
		const data = await Xhr.updateTask(theme, text, id);
		dispatch({
			type: ACTIONS.TASK.CHANGE.SC,
			id,
			data
		})
	} catch (err) {
		dispatch({
			type: ACTIONS.TASK.CHANGE.FL,
			data: err.message
		});
	}
};

export const deleteTask = (id) => async dispatch => {
	try {
		dispatch({type: ACTIONS.TASK.REMOVE.RQ});
		const data = await Xhr.deleteTask(id);
		dispatch({
			type: ACTIONS.TASK.REMOVE.SC,
			data
		})
	} catch (err) {
		dispatch({
			type: ACTIONS.TASK.REMOVE.FL,
			data: err.message
		});
	}
};

export const removeMessage = () => dispatch => {
	dispatch({
		type:  ACTIONS.TASK.REMOVE_MESSAGE.SC
	});
};