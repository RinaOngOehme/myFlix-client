export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_FAVORITES = "SET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";

export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const UPDATE_USER = 'UPDATE_USER';



export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  console.log('SET_USER action called');
  return {
    type: SET_USER,
    value
  };
}



export function setFavorites(value) {
  return { type: SET_FAVORITES, value };
}

export function addFavorite(value) {
  return { type: ADD_FAVORITE, value };
}

export function deleteFavorite(value) {
  return { type: DELETE_FAVORITE, value };
}


export function updateUser(value) {
  console.log('UPDATE_USER action reached');
  return { type: UPDATE_USER, value };
}

export function deleteUser(value) {
  return { type: DELETE_USER, value };
}
