'use strict';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { browserHistory } from 'react-router';
import {
  syncHistoryWithStore,
  routerMiddleware
} from 'react-router-redux';
import freeze from 'redux-freeze';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { reducers } from './reducers';

const production = (process.env.NODE_ENV === 'production');

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push( routerMiddleware( browserHistory ) );

// add the freeze dev middleware
if ( !production ) {
  middlewares.push( freeze );
  middlewares.push( logger );
}


// apply the middleware
let middleware = applyMiddleware( ...middlewares );

// add the redux dev tools
if ( !production && window.devToolsExtension ) {
  middleware = compose( middleware, window.devToolsExtension() );
}

// create the store
const store = createStore( reducers, middleware );
const history = syncHistoryWithStore( browserHistory, store );

// export
export { store, history };
