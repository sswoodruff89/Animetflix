import {
  RECEIVE_ALL_MOVIES,
  RECEIVE_MOVIE,
  RECEIVE_SEARCHED_MOVIES,
  RECEIVE_SEARCH_ERRORS,
  START_LOADING_MOVIES
} from "../actions/movies_actions";
// import {
//   RECEIVE_GENRES, START_LOADING_GENRES
// } from "../actions/genre_actions";

const initialState = {
  moviesLoading: false
};

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case START_LOADING_MOVIES:
      return Object.assign({}, state, {moviesLoading: true});
    case RECEIVE_ALL_MOVIES:
    case RECEIVE_SEARCHED_MOVIES:
    case RECEIVE_SEARCH_ERRORS:
      return Object.assign({}, state, {moviesLoading: false});
    default:
      return state;
  }
};