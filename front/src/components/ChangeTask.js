import Modal from "./Modal";
import {Button, Icon, Input} from "semantic-ui-react";
import React from "react";
import {updateTask} from "../redux/tasks/actions";

class ChangeTask extends React.Component {
  state = {
    theme: this.props.task.theme,
    text: this.props.task.text,
  };

  renderHeader = (id, deleteTask) => (
    <React.Fragment>
      Изменить задачу
      <Icon
        onClick={() => deleteTask(id)}
        name={'trash'}
      />
    </React.Fragment>
  );

  renderContent = () => (
    <React.Fragment>
      <Input
        value={this.state.theme}
        onChange={(e) => this.setState({theme: e.target.value})}
        label={'Тема'}
      />
      <Input
        value={this.state.text}
        onChange={(e) => this.setState({text: e.target.value})}
        label={'Задание'}
      />
    </React.Fragment>
  );

  renderButtons = () =>  {
    const {theme, text} = this.state;
    const {onUpdateTask: update, task} = this.props;

    return (
      <React.Fragment>
        <Button
          onClick={() => update(theme, text, task.id)}
          positive
        >Сохранить</Button>
      </React.Fragment>
    )
  };

  render() {
    return (
      <Modal
        header={this.renderHeader(this.props.task.id, this.props.onDeleteTask)}
        content={this.renderContent()}
        buttons={this.renderButtons()}
        close={this.props.close}
      />
    )
  }
}

export default ChangeTask;