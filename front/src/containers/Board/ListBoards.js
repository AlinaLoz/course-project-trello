import React, {Component} from 'react';
import {connect} from "react-redux";
import {dropBoard, dropMessage, getBoards} from "../../redux/boards/actions";
import subscribePagination from "../../hoc/subscribePagination";
import {setValue} from "../../redux/linked/actions";
import {ListBoardsComponent} from "../../components/ListBoard";

const SubscListBoard  = subscribePagination(ListBoardsComponent);

class ListBoardsContainer extends Component {
  state = {
    typeComponent: 'listBoards'
  };

  componentWillMount() {
    const {ongetBoards, numberPage, setValue} = this.props;
    setValue(this.state.typeComponent, 'numberPage', 0);
    ongetBoards(numberPage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.numberPage !== this.props.numberPage) {
      this.props.ongetBoards(nextProps.numberPage);
    }
  }

  render() {
    return <SubscListBoard {...this.state} {...this.props}/>;
  }
}

const ListBoardsLinkToStore = connect(
  state => ({
      boards  : state.boards.boards,
      countRecord  : state.boards.countRecord,
      message : state.boards.message,
      teams   : state.teams.teams,
      numberPage: state.linked.listBoards.numberPage
  }),
  dispatch => ({
      ongetBoards: (numberPage) => dispatch(getBoards(numberPage)),
      ondropBoard: (id) => dispatch(dropBoard(id)),
      ondropMessage: () => dispatch(dropMessage()),
      setValue: (component, field, value) => dispatch(setValue(component, field, value))
  })
)(ListBoardsContainer);

export default ListBoardsLinkToStore;