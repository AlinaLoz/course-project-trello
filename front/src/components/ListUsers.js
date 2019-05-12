import React from 'react';
import {Button, Grid, Header, Icon, List, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import GLOBAL from "../constans/global";

export const ListUsersComponent = ({numberPage, history, users, message, ondropMessage, deleteUser}) => {
  return (
    <Grid>
      <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
        <Message.Header>{message.info}</Message.Header>
      </Message>
      <Header>Список пользователей</Header>
      <List celled className={"list-users"}>
        {users.map((user, index) => <List.Item key={`item-${index}`}>
          <List.Content>
            <List.Header>
              {numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE + (index + 1)}.
              <span>{user.login}</span>
            </List.Header>
          </List.Content>
          <List.Content className={`content-button`}>
            <Button className={`button-drop-team`} >
              <Icon name="close" onClick={() => deleteUser(numberPage, user.id)}/>
            </Button>
          </List.Content>
        </List.Item>)}
      </List>
    </Grid>
  )
};