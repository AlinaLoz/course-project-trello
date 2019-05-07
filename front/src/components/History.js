import React from 'react';
import {Grid, Header, List} from "semantic-ui-react";

const History = ({userHistory}) => {
  return (
    <Grid>
      <Header>История событий:</Header>
      <List celled className={"list-board"}>
        {userHistory.map((item, index) => <List.Item key={`item-${index}`}>
         <p><strong>{index + 1}. Название доски: </strong>  {item.board.name}</p>
          <p><strong>Имя пользователя: </strong>  {item.user.login}</p>
          <p><strong>Действие: </strong>  {item.action.name}</p>
          <p><strong>Время: </strong>{item.time}</p>
        </List.Item>)}
      </List>
    </Grid>
  )
};

export default History;