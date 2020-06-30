import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {travelListReducer, travelSpotReducer} from './reducer/travelReducer';

// import logo from './logo.svg';
// import './App.css';
import Travel from './Travel';
import TravelSpot from './TravelSpot';

const rootReducer = combineReducers({
	travelListReducer,
	travelSpotReducer
  });


const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
  );

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Travel />
					</Route>
					{/* <Route path='/:id'>
						<TravelSpot />
					</Route> */}
					<Route path='/:id' component={TravelSpot} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
