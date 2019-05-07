import React, {Component} from 'react';
import {connect} from "react-redux";
import {Accordion, Button, Grid, Header, Icon, Input, List, Message} from "semantic-ui-react";
import {createList, dropList, dropMessage, getBoardById} from "../../redux/boards/actions";
import BoardList from "../List/BoardList";

class Board extends Component {
  state = {
    addList: false,
    newList: ''
  };

  componentWillMount() {
    const { board, match } = this.props;
    const { ongetBoardById } = this.props;
    ongetBoardById(match.params.id)
  }

  render() {
    const {ondropMessage, onCreateList, } = this.props;
    const {message, board} = this.props;
    const { newList } = this.state;

    return (
      <Grid className={`one-board`}>
        <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
          <Message.Header>{message.info}</Message.Header>
        </Message>
        <Header>Название доски: {board && board.name}</Header>
        <Header>Списки list:</Header>
        <List celled className={"one-board__list"}>
          {board && board.lists && board.lists.map((list, index) => <BoardList key={index} list={list} index={index}/>)}
        </List>
        <Button className={`ui button button-add`} onClick={() => this.setState(prevState => ({addList: !prevState.addList}))}>Добавить список задач</Button>
        {this.state.addList &&
          <div className={'one-board__add-list'}>
            <Input
                onChange={(e) => this.setState({newList: e.target.value})}
                label={'Новый список задач: '}
                icon={newList && <Icon name={'save'} onClick={() => onCreateList(board.id, newList)}/>}
              />
          </div>
        }
      </Grid>
    )
  }
}

export default connect(
  (state, props) => ({
    board: state.boards.boards.find(board => board.id == props.match.params.id),
    message: state.boards.message,
  }),
  dispatch => ({
    ongetBoardById: (id) => dispatch(getBoardById(id)),
    ondropMessage: () => dispatch(dropMessage()),
    onCreateList: (idBoard, nameList) => dispatch(createList(idBoard, nameList)),
  })
)(Board);