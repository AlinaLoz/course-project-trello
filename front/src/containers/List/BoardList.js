import React, {Component} from 'react';
import {Accordion, Button, Icon, List} from "semantic-ui-react";
import {connect} from "react-redux";
import {dropList} from "../../redux/boards/actions";
import {getTasksByIdList} from "../../redux/tasks/actions";
import CreateTask from "../Task/CreateTask";
import Task from "../Task/Task";
import ChangeTask from "../Task/ChangeTask";

class BoardList extends Component {
  state = {
    activeIndex: false,
    isCreateTask: false,
    isChangeTask: false,
  };

  createTask = () => {
    const {isCreateTask} = this.state;
    this.setState({isCreateTask: !isCreateTask});
  };

  changeTask = (task) => {
    this.setState({isChangeTask: task});
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({isCreateTask: false, isChangeTask: false});
  }

  handleClick = () => {
    const {activeIndex} = this.state;
    const { tasks, list, index } = this.props;
    const { getTasksByIdList } = this.props;

    if (!tasks.length) {
      getTasksByIdList(list.id);
    }
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { activeIndex, isCreateTask, isChangeTask } = this.state;
    const {list, index, tasks} = this.props;
    const { onDropList } = this.props;

    return (
      <Accordion styled style={{position: 'relative'}}>
        <Accordion.Title onClick={() => this.handleClick()} active={activeIndex === index} index={index}>
          <Icon name='dropdown'/>
          {index + 1}.{list.name}
          <Icon className={`content-button`}>
            <Button className={`button-drop-team`} >
              <Icon name="close" onClick={() => onDropList(list.id)}/>
            </Button>
          </Icon>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <List celled className={"one-board__list list-tasks"}>
            {tasks.map((task, index) => <Task key={index} change={() => this.changeTask(task)} content={task}/>)}
          </List>
          <Button className={`button-add`} onClick={() => this.createTask()}>Создать задачу</Button>
          {isCreateTask && <CreateTask
            close={() => this.createTask()}
            listId={list.id}
          />}
          {isChangeTask && <ChangeTask
            close={() => this.changeTask()}
            task={isChangeTask}
          />
          }
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default connect(
  (state, props) => ({
    tasks: state.tasks.tasks[props.list.id] || [],
  }),
  dispatch => ({
    onDropList: (idList) => dispatch(dropList(idList)),
    getTasksByIdList: (idList) => dispatch(getTasksByIdList(idList)),
  })
)(BoardList);