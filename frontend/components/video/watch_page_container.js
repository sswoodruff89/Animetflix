import { connect } from 'react-redux';
import { requestProgram } from "../../actions/program_actions";
import WatchPage from "./watch_page";


const msp = (state, ownProps) => {
  let program = state.entities.programs[ownProps.match.params.programId] || {};
  
  return {
    program
  };
};

const mdp = dispatch => {
  return {
    requestProgram: (programId) => {
      return dispatch(requestProgram(programId));
    }
  };
};

export default connect(msp, mdp)(WatchPage);
