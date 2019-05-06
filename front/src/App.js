import React, { Component } from 'react';
import {createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router} from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import RoutePage from "./Route";

const store = createStore(reducer, {}, composeWithDevTools(
	applyMiddleware(thunk)
));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<RoutePage/>
				</Router>
			</Provider>
	);
	}
}

export default App;
