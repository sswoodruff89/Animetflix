import { connect } from "react-redux";
import { requestProgramsByType } from "../../actions/program_actions";
// import { sortByDateAdded } from "../../reducers/sort_selector";

import TvPage from "./tv_page";

const msp = (state, ownProps) => {

  let programIds = [];
  Object.values(state.entities.programs).forEach(program => {
    if (program.program_type === "TV Show") {
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

export default connect(msp, mdp)(TvPage);
