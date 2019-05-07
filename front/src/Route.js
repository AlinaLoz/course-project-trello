import React from 'react';

import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import {connect} from "react-redux";
import Navbar from "./components/Sidebar";
import About from "./components/About";
import Team from "./containers/Team/TeamChange";
import ListTeams from "./containers/Team/ListTeams";
import ListBoards from "./containers/Board/ListBoards";
import History from "./containers/History/History";
import BoardCreate from "./containers/Board/BoardCreate";
import {fetchAuth} from "./redux/auth/actions";
import {TeamCreate} from "./containers/Team/TeamCreate";
import Board from "./containers/Board/Board";

class RoutePage extends React.Component {
	intervalAuth = null;

	componentWillMount() {
		const {onfetchAuth} = this.props;
		onfetchAuth();
		//this.intervalAuth = setInterval(() => onfetchAuth(), 5000);
	}

	render() {
		const {auth} = this.props;

		return (
			<React.Fragment>
				{auth && <Navbar/>}
				<Switch>
					<Route path='/register' component={Register}/>
					{!auth && <Route component={Login}/>}
					<Route path={'/about'} component={About} />
					<Route path={'/history'} component={History} />

					<Route path={'/team/change'} component={TeamCreate}/>
					<Route path={'/team/:id'} component={Team}/>
					<Route path={'/team'} component={ListTeams} />

					<Route path={'/board/:id'} component={Board}/>
					<Route path={'/boards'} component={ListBoards}/>
					<Route path={'/board-create'} component={BoardCreate}/>

					<Redirect to={'/about'}/>
				</Switch>
			</React.Fragment>
		)
	}
}


export default withRouter(
	connect(
		state => ({
			auth: state.auth.auth
		}),
		dispatch => ({
			onfetchAuth: () => dispatch(fetchAuth())
		})
	)(RoutePage)
);


