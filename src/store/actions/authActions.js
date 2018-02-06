'use strict';

// Can be avoid with connect from react-redux
import { store } from './../../store';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './authActionTypes';

function RequestLogin() {
  return {
    type: LOGIN_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true
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
      isFetching: false,
      errorMessage
    }
  };
}

function RequestLogout() {
  return {
    type: LOGOUT_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true
    }
  };
}

function SuccessLogout() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isAuthenticated: false,
      isFetching: false,
      user: {}
    }
  };
}

function ErrorLogout( errorMessage ) {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      isAuthenticated: true,
      isFetching: false,
      errorMessage
    }
  };
}

// Log the user out
export function logoutUser( username ) {
  store.dispatch( new RequestLogout() );
  $.ajax( {
    url: '/logout',
    type: 'POST',
    data: {
      username: username
    }
  } )
  .done( store.dispatch( new SuccessLogout() ) )
  .fail( function( error ) {
    store.dispatch( new ErrorLogout( error.statusText ) );
  });
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
        const { player } = data;
        store.dispatch( new SuccessLogin( {
          avatar: player.avatar,
          event: player.event,
          name: player.name,
          username
        } ) );
        break;
      default:
        store.dispatch( new ErrorLogin( 'Can\'t login' ) );
    }
  })
  .fail( function( error ) {
    store.dispatch( new ErrorLogin( error.statusText ) );
  });

}
