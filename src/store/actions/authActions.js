'use strict';

// Can be avoid with connect from react-redux
import { store } from './../../store';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from './authActionTypes';

function RequestLogin() {
  return {
    type: LOGIN_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true,
    }
  };
}

function SuccessLogin( user ) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      errorMessage: '',
      isFetching: false,
      isAuthenticated: true,
      user
    }
  };
}

function ErrorLogin( errorMessage ) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      errorMessage
    }
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true,
      isAuthenticated: true,
      user : {}
    }
  };
}

function successLogout() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isAuthenticated: false,
      user: {}
    }
  };
}

// Logs the user out
export function logoutUser() {
  store.dispatch( requestLogout() );
  $.ajax( {
    url: '/logout',
    type: 'POST',
    data: {
      username: 'rebecka'
    }
  } )
  .done( store.dispatch( new successLogout() ) )
  .fail( store.dispatch( new successLogout() ) ); // TODO: what to do when fail?
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser( username, password ) {
  store.dispatch( new RequestLogin() );
  $.ajax( {
    url: '/login',
    type: 'POST',
    data: {
      username: username,
      password: password
    }
  } )
  .done( function( data ) {
    switch ( data.status ) {
      case 'fail':
        store.dispatch( new ErrorLogin( data.error ) );
        break;
      case 'success':
        store.dispatch( new SuccessLogin( data.player ) );
        break;
      default:
        store.dispatch( new ErrorLogin( 'Can\'t login' ) );
    }
  })
  .fail( function( error ) {
    store.dispatch( new ErrorLogin( error.statusText ) );
  });

}
