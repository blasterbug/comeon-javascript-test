'use strict';

import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_FAILURE,
} from './../actions/casinoActionTypes';

function casino(
  state = {
    isFetching: false,
    errorMessage: '',
    games: [],
    categories: []
  },
  action ) {
  switch ( action.type ) {
    case CATEGORIES_REQUEST:
      return Object.assign( {}, state, action.payload );
    case CATEGORIES_SUCCESS:
      return Object.assign( {}, state, action.payload );
    case CATEGORIES_FAILURE:
      return Object.assign( {}, state, action.payload );
    case GAMES_REQUEST:
      return Object.assign( {}, state, action.payload );
    case GAMES_SUCCESS:
      return Object.assign( {}, state, action.payload );
    case GAMES_FAILURE:
      return Object.assign( {}, state, action.payload );
    default:
      return state;
  }
}

export default casino;
