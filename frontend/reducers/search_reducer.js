import { RECEIVE_SEARCHED_PROGRAMS } from "../actions/program_actions";

export default (state = [], action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_SEARCHED_PROGRAMS:
      let programIds = Object.keys(action.payload.programs);
      return {
        programIds,
        searchlist: action.payload.searchlist
      };
    default:
      return state;
  }
};