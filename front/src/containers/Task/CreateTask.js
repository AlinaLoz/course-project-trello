import {connect} from "react-redux";
import CreateTask from "../../components/CreateTask";
import {createTask} from "../../redux/tasks/actions";

export default connect(
  (state, props) => ({
    ...props
  }),
  (dispatch) => ({
    onSaveTask: (themeTask, contentTask, listId) => dispatch(createTask(themeTask, contentTask, listId)),
  }),
)(CreateTask);