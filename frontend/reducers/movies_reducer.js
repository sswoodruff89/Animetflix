import {RECEIVE_ALL_MOVIES, RECEIVE_MOVIE, RECEIVE_SEARCHED_MOVIES, RECEIVE_WATCHLIST_MOVIES} from "../actions/movies_actions";


export default (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_ALL_MOVIES:
      return action.movies;
    case RECEIVE_MOVIE:
      let newMovie = {
        [action.movie.id]: action.movie
      };
      return Object.assign({}, state, newMovie);
    case RECEIVE_SEARCHED_MOVIES:
      return Object.assign({}, state, action.payload.movies);
    case RECEIVE_WATCHLIST_MOVIES:
      return Object.assign({}, state, action.movies);
    default:
      return state;
  }
};