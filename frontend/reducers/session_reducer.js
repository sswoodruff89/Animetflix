import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from "../actions/session_actions";
import {RECEIVE_CURRENT_PROFILE} from "../actions/profile_actions";

const _nullSession = {
    id: null
};

export default (state = _nullSession, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { id: action.payload.user.id });
        case RECEIVE_CURRENT_PROFILE:
            return Object.assign({}, state, {profileId: action.profile.id})
        case LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
};