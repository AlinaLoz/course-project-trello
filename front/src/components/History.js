import React from 'react';
import {Grid, Header, List} from "semantic-ui-react";
import GLOBAL from '../constans/global';

const History = ({userHistory, numberPage}) => {
  return (
    <Grid>
      <Header>История событий:</Header>
      <List celled className={"list-board"}>
        {userHistory.map((item, index) => <List.Item key={`item-${index}`}>
         <p><strong>{numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE + (index + 1)}. Название доски: </strong>  {item.board.name}<strong>Имя пользователя: </strong>  {item.user.login}</p>
          <p><strong>Действие: </strong>  {item.action.name}<strong>Время: </strong>{item.time}</p>
        </List.Item>)}
      </List>
    </Grid>
  )
};

export default History;