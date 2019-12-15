import {combineReducers} from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import searchErrorsReducer from "./search_errors_reducer";

export default combineReducers({
    session: sessionErrorsReducer,
    search: searchErrorsReducer
});