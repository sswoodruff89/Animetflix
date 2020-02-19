import { connect } from "react-redux";
import { requestProgramsByType } from "../../actions/program_actions";

import MoviePage from "./movie_page";

const msp = (state, ownProps) => {

  let programIds = [];
  Object.values(state.entities.programs).forEach(program => {
    if (program.program_type === "Movie") {
        programIds.push(program.id);
    }
  });

  return {
    profileId: state.session.profileId,
    programIds
  };
};

const mdp = dispatch => {
  return {
    requestProgramsByType: type => {
      dispatch(requestProgramsByType(type));
    }
  };
};

export default connect(msp, mdp)(MoviePage);
