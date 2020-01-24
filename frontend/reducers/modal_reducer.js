import {
  OPEN_MODAL, CLOSE_MODAL
} from "../actions/modal_actions";


export default (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, action.modal);
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};
