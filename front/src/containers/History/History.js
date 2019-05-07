import React from 'react';
import { on, emit } from '../../services/SocketIO';
import History from '../../components/History';

function withSubscriptioOnHistory(WrappedComponent) {
  return class extends React.Component {
    state = {
      error: null,
      userHistory: []
    };

    componentWillMount() {
      on('user-history', (data) => {
        if (data.errors) return this.setState({error: data.errors});
        this.setState({userHistory: data.history});
      });

      on('user-history-one', (data) => {
        if (data.errors) return this.setState({error: data.errors});
        this.setState(prevState => (
          {userHistory: [data.history, ...prevState.userHistory]}
        ));
      })
    }

    componentDidMount() {
      emit('user-history-all', {});
    }

    render() {
      return <WrappedComponent  {...this.state} {...this.props}/>
    }
  }
}

export default withSubscriptioOnHistory(History);