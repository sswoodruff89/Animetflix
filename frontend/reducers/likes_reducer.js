import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_LIKES, RECEIVE_NEW_LIKE, REMOVE_LIKE } from "../actions/like_actions";
import { RECEIVE_CURRENT_PROFILE } from "../actions/profile_actions";

export default (state = {}, action) => {
    Object.freeze(state);
    let likes;

    switch (action.type) {
        case RECEIVE_LIKES:
            return action.likes;
        case RECEIVE_NEW_LIKE:
            let newLike = {
                [action.like.program_id]: action.like
            };
            return Object.assign({}, state, newLike);
        case REMOVE_LIKE:
            let newState = Object.assign({}, state);
            delete newState[action.programId];
            return newState;
        case RECEIVE_CURRENT_PROFILE:
            likes = action.profile.likes;
            return Object.assign({}, state, likes);
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};