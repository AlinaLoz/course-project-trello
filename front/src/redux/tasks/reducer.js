import {ACTIONS} from "../constans";

const defaultState = {
	tasks: {},
	message: {}
};

export default function tasks(state = defaultState, action) {
	switch (action.type) {
		case ACTIONS.TASK.GET.RQ:
			return {...state};
		case ACTIONS.TASK.GET.SC: {
			const {idList, data} = action;
			const {tasks} = state;
			return {...state, tasks: {...tasks, [idList]: data.tasks}};
		}
		case ACTIONS.TASK.GET.FL:
			return {...state};

		case ACTIONS.TASK.ADD.RQ:
			return {...state};
		case ACTIONS.TASK.ADD.SC: {
			const {tasks} = state;
			const {idList, data} = action;
			return {...state, tasks: {...tasks, [idList]: data.tasks}, message: {negative: false}};
		}
		case ACTIONS.TASK.ADD.FL:
			return {...state, message: {negative: true, text: action.messages}};


		case ACTIONS.TASK.CHANGE.RQ:
			return {...state};
		case ACTIONS.TASK.CHANGE.SC: {
			const {listId, changeTasks} = action.data;
			const {tasks} = state;

			return {...state, tasks: {...tasks, [listId]: changeTasks}, message: {negative: false}};
		}
		case ACTIONS.TASK.CHANGE.FL:
			return {...state, message: {negative: true, text: action.error}};

		case ACTIONS.TASK.REMOVE.RQ:
			return {...state};
		case ACTIONS.TASK.REMOVE.SC: {
			const {listId, changeTasks} = action.data;
			const {tasks} = state;
			return {...state, tasks: {...tasks, [listId]: changeTasks}, message: {negative: false}};
		}
		case ACTIONS.TASK.REMOVE.FL:
			return {...state, message: {negative: true, text: action.error}};

		case ACTIONS.TASK.REMOVE_MESSAGE.SC:
			return {...state, message: {}};
		default:
			return state;
	}
}