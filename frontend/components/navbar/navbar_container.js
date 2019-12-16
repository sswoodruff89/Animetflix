import NavBar from "./navbar";
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";

const msp = (state, ownProps) => {
  return {
    session: state.session.id,
  };
};

const mdp = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    }
  };
};

export default connect(msp, mdp)(NavBar);