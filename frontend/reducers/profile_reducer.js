import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_PROFILES, RECEIVE_CURRENT_PROFILE } from "../actions/profile_actions";



export default (state = {}, action) => {
    Object.freeze(state);
debugger
    switch (action.type) {
        case RECEIVE_CURRENT_PROFILE:
            return Object.assign({}, state, { [action.profile.id]: action.profile });
        case RECEIVE_PROFILES:
            return Object.assign({}, state, action.profiles);
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, action.payload.profiles )
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};