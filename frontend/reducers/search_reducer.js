import { RECEIVE_SEARCHED_MOVIES } from "../actions/movies_actions";

export default (state = [], action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_SEARCHED_MOVIES:
      let movieIds = Object.keys(action.payload.movies);
      return {
        movieIds,
        searchlist: action.payload.searchlist
      };
    default:
      return state;
  }
};