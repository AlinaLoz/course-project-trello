import Modal from "./Modal";
import {Button, Input} from "semantic-ui-react";
import React from "react";

class CreateTask extends React.Component {
    constructor(props) {
    super(props);
    this.themeTask = React.createRef();
    this.contentTask = React.createRef();
  }

  renderContent = () => (
    <React.Fragment>
      <Input
        ref={this.themeTask}
        label={'Тема'}
      />
      <Input
        ref={this.contentTask}
        label={'Задание'}
      />
    </React.Fragment>
  );

  renderButtons = (onSaveTask, listId) =>  {
    return (
      <React.Fragment>
        <Button
          onClick={() => onSaveTask(this.themeTask.current.inputRef.current.value, this.contentTask.current.inputRef.current.value, listId)}
          positive
        >Сохранить</Button>
      </React.Fragment>
    )
  };

  render() {
    return (
      <Modal
        header={'Создать задачу'}
        content={this.renderContent()}
        buttons={this.renderButtons(this.props.onSaveTask, this.props.listId)}
        close={this.props.close}
      />
    )
  }
}

export default CreateTask;