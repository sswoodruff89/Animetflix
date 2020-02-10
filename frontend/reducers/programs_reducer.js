import {RECEIVE_ALL_PROGRAMS, RECEIVE_PROGRAM, RECEIVE_SEARCHED_PROGRAMS, RECEIVE_WATCHLIST_PROGRAMS} from "../actions/program_actions";


export default (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_ALL_PROGRAMS:
      return action.programs;
    case RECEIVE_PROGRAM:
      let newProgram = {
        [action.program.id]: action.program
      };
      return Object.assign({}, state, newProgram);
    case RECEIVE_SEARCHED_PROGRAMS:
      return Object.assign({}, state, action.payload.programs);
    case RECEIVE_WATCHLIST_PROGRAMS:
      return Object.assign({}, state, action.programs);
    default:
      return state;
  }
};