import React, {Component} from 'react';
import {connect} from "react-redux";
import {dropMessage, dropTeam, getTeams} from "../../redux/teams/actions";
import {setValue} from "../../redux/linked/actions";
import subscribePagination from "../../hoc/subscribePagination";
import {ListTeamsComponent} from "../../components/ListTeams";
import {withRouter} from "react-router-dom";

const SubscListTeams  = subscribePagination(ListTeamsComponent);

class ListTeamsContainer extends Component{
  state = {
    countRecord: 0,
    typeComponent: 'listTeams'
  };

  componentWillMount() {
    const {ongetTeams, numberPage, setValue} = this.props;
    setValue(this.state.typeComponent, 'numberPage', 0);
    ongetTeams(numberPage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams !== this.props.teams) {
      this.setState({countRecord: nextProps.teams.length});
    }
    if (nextProps.numberPage !== this.props.numberPage) {
      this.props.ongetTeams(nextProps.numberPage);
    }
  }

  render() {
    return <SubscListTeams {...this.state} {...this.props}/>;
  }
}

export default connect(
    state => ({
        teams  : state.teams.teams,
        countRecord: state.teams.countRecord,
        message: state.teams.messageOfDrop,
        numberPage: state.linked.listTeams.numberPage
    }),
    dispatch => ({
        ongetTeams: (numberPage) => dispatch(getTeams(numberPage)),
        ondropTeam: (numberPage, id) => dispatch(dropTeam(numberPage, id)),
        ondropMessage: () => dispatch(dropMessage()),
        setValue: (component, field, value) => dispatch(setValue(component, field, value))
    })
)(withRouter(ListTeamsContainer));