import SessionForm from "./session_form";
import { signup, removeErrors } from "../../actions/session_actions";
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
    },
    removeErrors: () => {
      return dispatch(removeErrors());
    }
  };
};

export default connect(msp, mdp)(SessionForm);