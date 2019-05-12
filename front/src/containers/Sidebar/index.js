import {connect} from "react-redux";
import {logOut} from "../../redux/auth/actions";
import NavbarComponent from "../../components/Sidebar";
import {withRouter} from "react-router-dom";

export default withRouter(connect(
  state => ({
    login: state.auth.login,
    role: state.auth.role,
  }),
  dispatch => ({
    onlogOut: () => dispatch(logOut())
  }),
)(NavbarComponent));