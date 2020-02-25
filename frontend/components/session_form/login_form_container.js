import SessionForm from "./session_form";
import { login, removeErrors } from "../../actions/session_actions";
import {connect} from "react-redux";

const msp = (state, ownProps) => {
  return {
    formType: "login",
    errors: state.errors
  };
};

const mdp = dispatch => {
  return {
    processForm: sessionForm => {
      return dispatch(login(sessionForm));
    },
    login: user => {
      return dispatch(login(user));
    },
    removeErrors: () => {
      return dispatch(removeErrors());
    }
  };
};

export default connect(msp, mdp)(SessionForm);