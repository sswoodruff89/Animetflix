import {RECEIVE_CURRENT_USER} from "../actions/session_actions";

export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            const newUser = {
                [action.payload.user.id]: action.payload.user
            };
            return Object.assign({}, state, newUser);
        default: 
            return state;
    }
};