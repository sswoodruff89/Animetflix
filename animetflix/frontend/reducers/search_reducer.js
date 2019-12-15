import { RECEIVE_SEARCHED_MOVIES } from "../actions/movies_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCHED_MOVIES:
      return Object.keys(action.movies);
    default:
      return state;
  }
};