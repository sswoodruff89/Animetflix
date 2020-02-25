import {
  RECEIVE_ALL_PROGRAMS,
  RECEIVE_PROGRAM,
  RECEIVE_WATCHLIST_PROGRAMS,
  RECEIVE_WATCHLIST_ERRORS,
  RECEIVE_SEARCHED_PROGRAMS,
  RECEIVE_SEARCH_ERRORS,
  START_LOADING_PROGRAMS,
  END_LOADING_PROGRAMS
} from "../actions/program_actions";
import {RECEIVE_WATCHLIST} from "../actions/watchlist_actions"; 

const initialState = {
  programsLoading: false
};

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case START_LOADING_PROGRAMS:
      return Object.assign({}, state, {programsLoading: true});
    case RECEIVE_ALL_PROGRAMS:
    case RECEIVE_SEARCHED_PROGRAMS:
    case RECEIVE_SEARCH_ERRORS:
    case RECEIVE_WATCHLIST_ERRORS:
    case RECEIVE_WATCHLIST_PROGRAMS:
    case END_LOADING_PROGRAMS:
      return Object.assign({}, state, {programsLoading: false});
    default:
      return state;
  }
};