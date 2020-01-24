import { combineReducers } from "redux";
import loadingReducer from "./loading_reducer";
import modalReducer from "./modal_reducer";

export default combineReducers({
  loading: loadingReducer,
  modal: modalReducer
});