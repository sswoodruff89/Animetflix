import { RECEIVE_GENRES } from "../actions/genre_actions";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
   
    case RECEIVE_GENRES:
      return action.genres;
    default:
      return state;
  }
};