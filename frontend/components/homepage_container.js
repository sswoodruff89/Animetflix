import HomePage from "./homepage";
import { login } from "../actions/session_actions";
import { connect } from "react-redux";


const mdp = dispatch => {
  return {
    login: (user) => {
      return dispatch(login(user));
    }
  };
};

export default connect(null, mdp)(HomePage);