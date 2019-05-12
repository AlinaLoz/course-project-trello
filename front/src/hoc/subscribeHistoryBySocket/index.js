import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { on, emit } from '../../services/SocketIO';
import GLOBAL from "../../constans/global";
import {setValue} from "../../redux/linked/actions";

//спросить у ментора
function subscribeHistoryBySocket(WrappedComponent) {
  return class extends React.Component {
    state = {
      error: null,
      userHistory: [],
      countRecord: 0,
      typeComponent: 'history'
    };

    componentWillMount() {
      on('user-history', (data) => this.getAllHistory(data));
      on('user-history-one', (data) => this.getOneHistory(data))
    }

    componentWillReceiveProps(nextProps) {
      const {numberPage} = nextProps;
      if (numberPage !== this.props.numberPage ) {
        emit('user-history-all', {numberPage});
      }
    }

    componentDidMount() {
      emit('user-history-all', {numberPage: this.props.numberPage});
    }

    getAllHistory = (data) => {
      const {setValue} = this.props;
      const {typeComponent} = this.state;
      if (data.errors) return this.setState({error: data.errors});
      setValue(typeComponent, 'countRecord', data.countRecord);
      this.setState({userHistory: data.history, countRecord: data.countRecord});
    };

    getOneHistory = (data) => {
      if (data.errors) return this.setState({error: data.errors});
      let {userHistory, countRecord, typeComponent} = this.state;
      const {setValue} = this.props;

      if (this.props.numberPage === 0)  {
        userHistory = [data.history, ...userHistory].slice(0, GLOBAL.LIMIT_RECORD_ON_PAGE);
        setValue(typeComponent, 'countRecord', data.countRecord);
        this.setState({userHistory: [...userHistory], countRecord: countRecord + 1});
      }
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props}/>;
    }
  }
}

const composedHoc = compose(
  connect(
    (state, props) => ({
      numberPage: state.linked.history.numberPage
    }),
    dispatch => ({
      setValue: (component, field, value) => dispatch(setValue(component, field, value))
    }),
  ),
  subscribeHistoryBySocket
);

export default composedHoc;