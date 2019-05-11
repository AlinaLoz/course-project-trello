import React from 'react';
import { on, emit } from '../../services/SocketIO';
import History from '../../components/History';
import {Button} from "semantic-ui-react";
import GLOBAL from "../../constans/global";

function withSubscriptioOnHistory(WrappedComponent) {
  return class extends React.Component {
    state = {
      error: null,
      userHistory: [],
      countRecord: 0,
      numberPage: 0
    };

    componentWillMount() {
      on('user-history', (data) => this.getAllHistory(data));
      on('user-history-one', (data) => this.getOneHistory(data))
    }

    componentDidMount() {
      emit('user-history-all', {numberPage: this.state.numberPage});
    }

    changePage = (changeValue) => {
      let {numberPage} = this.state;
      numberPage += parseInt(changeValue);
      this.setState({numberPage});
      emit('user-history-all', {numberPage});
    };

    getAllHistory = (data) => {
      if (data.errors) return this.setState({error: data.errors});
      this.setState({userHistory: data.history, countRecord: data.countRecord});
    };

    getOneHistory = (data) => {
      if (data.errors) return this.setState({error: data.errors});
      let {userHistory, countRecord} = this.state;
      if (this.state.numberPage === 0)  {
        userHistory = [data.history, ...userHistory].slice(0, GLOBAL.LIMIT_RECORD_ON_PAGE);
        this.setState({userHistory: [...userHistory], countRecord: countRecord + 1});
      }
    };

    renderPaginationPanel = () => {
      return (
        <div className={'render-pagination-panel'}>
          {this.state.numberPage > 0 &&
            <Button onClick={() => this.changePage(-1)}>Назад</Button>}
          {this.state.numberPage < parseInt(this.state.countRecord / GLOBAL.LIMIT_RECORD_ON_PAGE) &&
            <Button onClick={() => this.changePage(1)}>Вперёд</Button>}
        </div>
      )
    };

    render() {
      return (
          <React.Fragment>
            <WrappedComponent {...this.state} {...this.props}/>
            {this.renderPaginationPanel()}
          </React.Fragment>
        )
    }
  }
}

export default withSubscriptioOnHistory(History);