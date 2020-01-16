import SessionForm from "./session_form";
import { signup } from "../../actions/session_actions";
import { login } from "../../actions/session_actions";
import { connect } from "react-redux";

const msp = (state, ownProps) => {
  return {
    formType: "signup",
    errors: state.errors
  };
};

const mdp = dispatch => {
  return {
    processForm: sessionForm => {
      return dispatch(signup(sessionForm));
    },
    login: user => {
      return dispatch(login(user));
    }
  };
};

export default connect(msp, mdp)(SessionForm);