import {RECEIVE_ALL_MOVIES, RECEIVE_MOVIE} from "../actions/movies_actions";


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
    default:
      return state;
  }
};