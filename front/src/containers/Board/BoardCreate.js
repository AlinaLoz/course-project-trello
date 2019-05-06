import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Checkbox, Dropdown, Form, Grid, Header, Input, Label, Message} from "semantic-ui-react";
import {getTeams} from "../../redux/teams/actions";
import {createBoard, dropMessage} from "../../redux/boards/actions";

class BoardCreate extends Component {
    state = {
        name       : '',
        team       : '',
        isTeamBoard: false,
    };

    componentWillMount() {
        const {teams, onGetTeams} = this.props;
        if (!teams.length) {
            onGetTeams();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {message} = nextProps;

        if (this.props.message !== message) {
            if (!message.negative) {
                this.props.history.push('/boards');
            }
        }
    }

    render(){
        const {onCreateBoard, ondropMessage, message, teams} = this.props;
        const {name, isTeamBoard, team} = this.state;

        const filterTeams = teams.map(team => ({key: team.id, text: team.name, value: team.id}));

        return (
          <Grid className={`board-create`}>
              <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
                  <Message.Header>{message.info}</Message.Header>
              </Message>
              <Header>Создать доску</Header>
              <Form>
                  <Input className={`board-name`}>
                      <Label>Название:</Label>
                      <input type="text"
                             onChange={(e) => this.setState({name: e.target.value})} />
                  </Input>
                  <Checkbox
                    className={'checkbox'}
                    label={{children: "командая доска"}}
                    onChange={(e) => this.setState(prevState => ({isTeamBoard: !prevState.isTeamBoard}))}/>
                  <Dropdown
                    placeholder='select team'
                    fluid
                    selection
                    disabled={!this.state.isTeamBoard}
                    onChange={(e, data) => this.setState({team: data.value})}
                    options={filterTeams}
                  />
                  <Button className={`button-save`} onClick={() => onCreateBoard(name, isTeamBoard, team)}>Создать</Button>
              </Form>
          </Grid>
        )
    }
}

export default connect(
  state => ({
      message: state.boards.message,
      teams  : state.teams.teams,
  }),
  dispatch => ({
      onGetTeams: () => dispatch(getTeams()),
      ondropMessage: () => dispatch(dropMessage()),
      onCreateBoard: (name, isTeamBoard, team) => dispatch(createBoard(name, isTeamBoard, team))
  })
)(BoardCreate);