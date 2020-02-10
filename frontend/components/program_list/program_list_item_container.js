import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestProgram } from "../../actions/program_actions";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";

import ProgramListItem from "./program_list_item";

const msp = (state, ownProps) => {

  let genreCheck = (Object.entries(state.entities.genres).length > 0);

  let genres = (ownProps.program && genreCheck && ownProps.program.genreIds.length > 0 && ownProps.program.genreIds[0] !== undefined) ? ownProps.program.genreIds.map((id) => {
    return state.entities.genres[id].name;
  }) : [];

  let watched = (ownProps.program && state.entities.watchlists[ownProps.program.id]) ?
    state.entities.watchlists[ownProps.program.id] : null;

  return {
    program: ownProps.program,
    displayType: ownProps.displayType,
    watched,
    genres
  };
};

const mdp = dispatch => {
  return {
    requestProgram: (programId) => {
      return dispatch(requestProgram(programId));
    },
    addToWatchList: (programId) => {
      return dispatch(addToWatchList(programId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    }      
  };
};

export default withRouter(connect(msp, mdp)(ProgramListItem));