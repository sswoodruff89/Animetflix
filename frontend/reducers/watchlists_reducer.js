import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from "../actions/session_actions";
import { RECEIVE_NEW_WATCH, REMOVE_WATCH } from "../actions/watchlist_actions";


export default (state = {}, action) => {
  Object.freeze(state);
  let watchlist;
  debugger
  switch (action.type) {
    
    case RECEIVE_NEW_WATCH:
      let newWatch = {
        [action.watch.movie_id]: action.watch
      };
      return Object.assign({}, state, newWatch);
    case REMOVE_WATCH:
      let newState = Object.assign({}, state);
      delete state.entities.watchlists[action.movieId];
      return newState;
    case RECEIVE_CURRENT_USER:
      watchlist = action.payload.watchlist;
      return Object.assign({}, state, watchlist);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};