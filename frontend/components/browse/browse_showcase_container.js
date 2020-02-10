import Showcase from "./browse_showcase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestProgram } from "../../actions/program_actions";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";



const msp = (state, ownProps) => {

    let showcaseProgram = state.entities.programs[ownProps.programId] || {};
    let watched = (showcaseProgram && state.entities.watchlists[showcaseProgram.id]) ?
        state.entities.watchlists[showcaseProgram.id] : null;

    return {
        session: state.session.id,
        showcaseProgram,
        watched,
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