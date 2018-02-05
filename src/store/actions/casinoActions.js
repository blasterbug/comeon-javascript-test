'use strict';

// Can be avoid with connect from react-redux
import { store } from './../../store';

import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_FAILURE
} from './casinoActionTypes';

function RequestGames() {
  return {
    type: GAMES_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true,
    }
  };
}

function SuccessGames( games ) {
  return {
    type: GAMES_SUCCESS,
    payload: {
      errorMessage: '',
      isFetching: false,
      games
    }
  };
}

function ErrorGames( errorMessage ) {
  return {
    type: GAMES_FAILURE,
    payload: {
      errorMessage
    }
  };
}

function RequestCategories() {
  return {
    type: CATEGORIES_REQUEST,
    payload: {
      errorMessage: '',
      isFetching: true,
    }
  };
}

function SuccessCategories( categories ) {
  return {
    type: CATEGORIES_SUCCESS,
    payload: {
      errorMessage: '',
      isFetching: false,
      categories
    }
  };
}

function ErrorCategories( errorMessage ) {
  return {
    type: CATEGORIES_FAILURE,
    payload: {
      errorMessage
    }
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function listGames() {
  store.dispatch( new RequestGames() );
  $.ajax( {
    url: '/games'
  } )
  .done( function( games ) {
    store.dispatch( new SuccessGames( games ) );
  })
  .fail( function( error ) {
    store.dispatch( new ErrorGames( error.statusText ) );
  });
}

export function listCategories() {
  store.dispatch( new RequestGames() );
  $.ajax( {
    url: '/categories'
  } )
  .done( function( data  ) {
    store.dispatch( new SuccessCategories( data ) );
  })
  .fail( function( error ) {
    store.dispatch( new ErrorCategories( error.statusText ) );
  });
}
