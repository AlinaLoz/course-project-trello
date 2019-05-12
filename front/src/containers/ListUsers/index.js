import React from 'react';
import subscribePagination from "../../hoc/subscribePagination";
import {connect} from "react-redux";
import {dropBoard, dropMessage, getBoards} from "../../redux/boards/actions";
import {setValue} from "../../redux/linked/actions";
import {ListUsersComponent} from "../../components/ListUsers";
import {deleteUser, getAllUsers} from "../../redux/auth/actions";

const SubscListUsers  = subscribePagination(ListUsersComponent);

class ListUsersContainer extends React.Component {
  state = {
    typeComponent: 'listUsers'
  };

  componentWillMount() {
    const {getAllUsers, numberPage, setValue} = this.props;
    setValue(this.state.typeComponent, 'numberPage', 0);
    getAllUsers(numberPage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.numberPage !== this.props.numberPage) {
      this.props.getAllUsers(nextProps.numberPage);
    }
  }

  render() {
    return <SubscListUsers {...this.state} {...this.props}/>;
  }
}


const ListUsersLinkToStore = connect(
  state => ({
    users  : state.auth.listUsers,
    message : state.boards.message,
    countRecord : state.auth.countRecord,
    numberPage: state.linked.listUsers.numberPage
  }),
  dispatch => ({
    getAllUsers: (numberPage) => dispatch(getAllUsers(numberPage)),
    deleteUser: (numberPage, id) => dispatch(deleteUser(numberPage, id)),
    ondropMessage: () => dispatch(dropMessage()),
    setValue: (component, field, value) => dispatch(setValue(component, field, value))
  })
)(ListUsersContainer);

export default ListUsersLinkToStore;