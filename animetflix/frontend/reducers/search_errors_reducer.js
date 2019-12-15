import { RECEIVE_SEARCHED_MOVIES, RECEIVE_SEARCH_ERRORS } from "../actions/movies_actions";


export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SEARCH_ERRORS:
      return action.errors;
    case RECEIVE_SEARCHED_MOVIES:
      return [];
    default:
      return state;
  }
};