import React from 'react';
import {Card, Icon} from "semantic-ui-react";

const Task = ({content, change}) => {
  return (
    <Card className={'task'}>
      <Card.Header><strong>Тема: </strong>{content.theme}
        <Icon onClick={() => change()} name={'edit'}/>
      </Card.Header>
      <Card.Content>
        <strong>Задание: </strong>
        {content.text}
      </Card.Content>
    </Card>
  )
};

export default Task;