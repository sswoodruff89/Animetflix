import { RECEIVE_WATCHLIST_PROGRAMS, RECEIVE_WATCHLIST_ERRORS } from "../actions/program_actions";


export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_WATCHLIST_ERRORS:
            return action.errors;
        case RECEIVE_WATCHLIST_PROGRAMS:
            return [];
        default:
            return state;
    }
};