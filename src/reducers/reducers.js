import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, DELETE_USER, UPDATE_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer called');
      return action.value

    case UPDATE_USER:
      return action.value

    case DELETE_USER:
      return action.value

    default:
      return state;
  }
}

function currentFavorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    case ADD_FAVORITE:
      let addedMovieState = state.concat(action.value);
      return addedMovieState;
    case DELETE_FAVORITE:
      let deletedMovieState = state.filter((m) => m !== action.value);
      return deletedMovieState;
    default:
      return state;
  }
}




const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  currentFavorites,

});

export default moviesApp;
