import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Grid, Header, Icon, Message, List} from "semantic-ui-react";
import {dropBoard, dropMessage, getBoards} from "../../redux/boards/actions";
import {Link} from "react-router-dom";

class ListBoards extends Component{
    componentWillMount() {
        const {ongetBoards} = this.props;
        ongetBoards();
    }

    render(){
        const {boards, message, teams} = this.props;
        const {ondropMessage, ondropBoard} = this.props;

        const teamName = board => teams.length  && board.ownerIsTeam ?  `(${teams.find(t => t.id == board.teamId).name})` : '';
        return (
          <Grid>
              <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
                  <Message.Header>{message.info}</Message.Header>
              </Message>
              <Header>Доски</Header>
              <List celled className={"list-board"}>
                  {boards.map((board, index) => <List.Item key={`item-${index}`}>
                      <List.Content>
                          <List.Header>
                            <Link to={`/board/${board.id}`}>{board.name}{teamName(board)}</Link>
                          </List.Header>
                      </List.Content>
                      <List.Content className={`content-button`}>
                          <Button className={`button-drop-team`} >
                              <Icon name="close" onClick={() => ondropBoard(board.id)}/>
                          </Button>
                      </List.Content>
                  </List.Item>)}
              </List>
              <Button className={`button-add`} onClick={() => this.props.history.push('/board-create')}>Создать</Button>
          </Grid>
        )
    }
}


export default connect(
  state => ({
      boards  : state.boards.boards,
      message : state.boards.message,
      teams   : state.teams.teams,
  }),
  dispatch => ({
      ongetBoards: () => dispatch(getBoards()),
      ondropBoard: (id) => dispatch(dropBoard(id)),
      ondropMessage: () => dispatch(dropMessage())
  })
)(ListBoards);