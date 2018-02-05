'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import casino from './casino';

// main reducers
const combinedReducers = combineReducers({
  routing: routerReducer,
  auth,
  casino
});

export const reducers = function(state, action) {
  if ( action.type === 'LOGOUT_SUCCESS' ) {
    state = undefined;
  }
  return combinedReducers(state, action);
}
