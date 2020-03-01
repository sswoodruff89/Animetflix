import Showcase from "./browse_showcase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {requestProgram} from "../../actions/program_actions";
import {addToWatchList, removeFromWatchList} from "../../actions/watchlist_actions";

import {checkLikeDislikeWatchlist} from "../../util/helper_util";



const msp = (state, ownProps) => {

    let programs = Object.values(state.entities.programs);
    let showcaseProgram = programs[state.session.showcaseIdx % programs.length] || {};

    let {watched, liked, disliked} = checkLikeDislikeWatchlist(
      showcaseProgram,
      state
    );
    
    return {
        session: state.session.id,
        showcaseProgram,
        watched,
        liked,
        disliked,
        loading: state.ui.loading.programsLoading
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

export default withRouter(connect(msp, mdp)(Showcase));