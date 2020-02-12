import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_DISLIKES, RECEIVE_NEW_DISLIKE, REMOVE_DISLIKE } from "../actions/like_actions";
import { RECEIVE_CURRENT_PROFILE } from "../actions/profile_actions";

export default (state = {}, action) => {
    Object.freeze(state);
    let dislikes;

    switch (action.type) {
        case RECEIVE_DISLIKES:
            return action.dislikes;
        case RECEIVE_NEW_DISLIKE:
            let newDislike = {
                [action.dislike.program_id]: action.dislike
            };
            return Object.assign({}, state, newDislike);
        case REMOVE_DISLIKE:
            let newState = Object.assign({}, state);
            delete newState[action.programId];
            return newState;
        case RECEIVE_CURRENT_PROFILE:
            dislikes = action.profile.dislikes;
            return Object.assign({}, state, dislikes);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};