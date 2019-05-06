import {connect} from "react-redux";
import ChangeTask from "../../components/ChangeTask";
import {deleteTask, updateTask} from "../../redux/tasks/actions";

export default connect(
  (state, props) => ({
    ...props
  }),
  (dispatch) => ({
    onDeleteTask: (id) => dispatch(deleteTask(id)),
    onUpdateTask: (themeTask, contentTask, id) => dispatch(updateTask(themeTask, contentTask, id)),
  }),
)(ChangeTask);