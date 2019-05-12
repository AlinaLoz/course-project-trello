import React from 'react';
import {Button, Grid, Header, Icon, List, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import GLOBAL from "../constans/global";

export const ListBoardsComponent = ({numberPage, history, boards, message, teams, ondropMessage, ondropBoard}) => {
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
              {numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE + (index + 1)}.
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
      <Button className={`button-add`} onClick={() => history.push('/board-create')}>Создать</Button>
    </Grid>
  )
};
