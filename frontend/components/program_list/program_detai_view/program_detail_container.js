import { connect } from "react-redux";
import { requestProgram } from "../../../actions/program_actions";
import { addLike, removeFromLikes, addDislike, removeFromDislikes } from "../../../actions/like_actions";
import { addToWatchList, removeFromWatchList } from "../../../actions/watchlist_actions";
// import { requestGenres } from "../../../actions/genre_actions";
import ProgramDetail from "./program_detail";
import { checkLikeDislikeWatchlist } from "../../../util/helper_util";
import { isEmpty } from "lodash";
import {withRouter} from "react-router-dom";


const msp = (state, ownProps) => {
  // let programId = ownProps.programId || null;
  let program = state.entities.programs[ownProps.match.params.programId];

  // let genreCheck = (Object.entries(state.entities.genres).length > 0);
  
  let genres =
    program &&
    !isEmpty(state.entities.genres)
    // ownProps.program.genreIds.length > 0 &&
    // program.genreIds[0]
      ? program.genreIds.map(id => {
          return state.entities.genres[id].name;
        })
      : [];

  
  let displayType = ownProps.history.location.pathname.includes("search")
    ? "search"
    : ownProps.displayType;

  let { watched, liked, disliked } = checkLikeDislikeWatchlist(
    program,
    state
  );

  return {
    program,
    programId: ownProps.match.params.programId,
    genres,
    watched,
    displayType,
    liked,
    disliked
  };
};

const mdp = (dispatch) => {
  return {
    requestProgram: (programId) => {
      return dispatch(requestProgram(programId));
    },
    addToWatchList: (programId) => {
      return dispatch(addToWatchList(programId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    },
    addLike: (programId) => {
      return dispatch(addLike(programId));
    },
    removeFromLikes: (likeId) => {
      return dispatch(removeFromLikes(likeId));
    },
    addDislike: (programId) => {
      return dispatch(addDislike(programId));
    },
    removeFromDislikes: (dislikeId) => {
      return dispatch(removeFromDislikes(dislikeId));
    } 

  };
};

export default withRouter(connect(msp, mdp)(ProgramDetail));