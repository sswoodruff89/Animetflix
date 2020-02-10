import { RECEIVE_SEARCHED_PROGRAMS, RECEIVE_SEARCH_ERRORS } from "../actions/program_actions";


export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SEARCH_ERRORS:
      return action.errors;
    case RECEIVE_SEARCHED_PROGRAMS:
      return [];
    default:
      return state;
  }
};