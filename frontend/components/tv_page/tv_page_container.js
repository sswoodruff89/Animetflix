import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { requestGenres } from "../../actions/genre_actions";
import { requestProgramsByType } from "../../actions/program_actions";

import TvPage from "./tv_page";

const msp = (state, ownProps) => {

  let programIds = [];
  Object.values(state.entities.programs).forEach(program => {
    if (program.program_type === "TV Show") {
        programIds.push(program.id);
    }
  });

  let genresLoaded = isEmpty(state.entities.genres) ? false : true;

  return {
    profileId: state.session.profileId,
    programIds,
    genresLoaded,
    loading: state.ui.loading.programsLoading
  };
};

const mdp = dispatch => {
  return {
    requestProgramsByType: type => {
      dispatch(requestProgramsByType(type));
    },
    requestGenres: () => {
        dispatch(requestGenres());
    }
  };
};

export default connect(msp, mdp)(TvPage);
