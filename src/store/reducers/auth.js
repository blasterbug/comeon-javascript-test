'use strict';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './../actions/authActionTypes';

function auth(
  state = {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: ''
  },
  action ) {
  switch ( action.type ) {
    case LOGIN_REQUEST:
      return Object.assign( {}, state, action.payload );
    case LOGIN_SUCCESS:
      return Object.assign( {}, state, action.payload );
    case LOGIN_FAILURE:
      return Object.assign( {}, state, action.payload );
    case LOGOUT_REQUEST:
      return Object.assign( {}, state, action.payload );
    case LOGOUT_SUCCESS:
      return Object.assign( {}, state, action.payload );
    case LOGOUT_FAILURE:
      return Object.assign( {}, state, action.payload );
    default:
      return state;
  }
}

export default auth;
