import React from 'react';
import {Button, Grid, Header, Icon, Image, List, Message} from "semantic-ui-react";
import GLOBAL from "../constans/global";

export const ListTeamsComponent = ({numberPage, teams, message, ondropTeam, ondropMessage, history}) => {
  return (
    <Grid>
      <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
        <Message.Header>{message.info}</Message.Header>
      </Message>
      <Header>Команды</Header>
      <List celled className={"list-teams"}>
        {teams.map((team, index) => <List.Item key={`item-${index}`}>
          {numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE + (index + 1)}.
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
          <List.Content>
            <List.Header>{team.name}</List.Header>
          </List.Content>
          <List.Content className={`content-button`}>
            <Button className={`button-show-team`} onClick={() => history.push(`/team/${team.id}`)}>Показать</Button>
            <Button className={`button-drop-team`} onClick={() => ondropTeam(numberPage, team.id)}>
              <Icon name="close"/>
            </Button>
          </List.Content>
        </List.Item>)}
        <Button className={`button-add`} onClick={() => history.push('/team/change')}>Создать</Button>
      </List>
    </Grid>
  )
};

export default ListTeamsComponent;