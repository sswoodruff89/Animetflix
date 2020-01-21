import { RECEIVE_WATCHLIST_MOVIES, RECEIVE_WATCHLIST_ERRORS } from "../actions/movies_actions";


export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_WATCHLIST_ERRORS:
            return action.errors;
        case RECEIVE_WATCHLIST_MOVIES:
            return [];
        default:
            return state;
    }
};