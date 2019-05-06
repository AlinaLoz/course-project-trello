import auth from "./auth/reducer";
import register from "./register/reducer";
import tasks from "./tasks/reducer";
import teams from "./teams/reducer";
import boards from "./boards/reducer";
import {combineReducers} from "redux";

export default combineReducers({
	auth,
	register,
	tasks,
	teams,
	boards,
});