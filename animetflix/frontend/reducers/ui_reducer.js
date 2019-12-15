import { combineReducers } from "redux";
import loadingReducer from "./loading_reducer";

export default combineReducers({
  loading: loadingReducer
});