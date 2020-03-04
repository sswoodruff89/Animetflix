import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestProgram } from "../../actions/program_actions";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";
import { addLike, removeFromLikes, addDislike, removeFromDislikes } from "../../actions/like_actions";
import { isEmpty } from "lodash";

import { checkLikeDislikeWatchlist } from "../../util/helper_util";


import ProgramListItem from "./program_list_item";

const msp = (state, ownProps) => {

  let genres =
    ownProps.program &&
    !isEmpty(state.entities.genres) &&
    ownProps.program.genreIds.length > 0 &&
    ownProps.program.genreIds[0] !== undefined
      ? ownProps.program.genreIds.map(id => {
          return state.entities.genres[id].name;
        })
      : [];

    let { watched, liked, disliked } = checkLikeDislikeWatchlist(
      ownProps.program,
      state
    );



  return {
    program: ownProps.program,
    displayType: ownProps.displayType,
    watched,
    liked,
    disliked,
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

export default withRouter(connect(msp, mdp)(ProgramListItem));