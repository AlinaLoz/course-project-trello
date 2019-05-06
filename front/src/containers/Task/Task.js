import {connect} from "react-redux";
import Task from "../../components/Task";

export default connect(
  (state, props) => ({
    ...props
  }),
  (dispatch) => ({}),
)(Task);