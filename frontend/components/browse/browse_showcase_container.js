import Showcase from "./browse_showcase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestMovie } from "../../actions/movies_actions";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";



const msp = (state, ownProps) => {

    let showcaseMovie = state.entities.movies[ownProps.movieId] || {};
    let watched = (showcaseMovie && state.entities.watchlists[showcaseMovie.id]) ?
        state.entities.watchlists[showcaseMovie.id] : null;

    return {
        session: state.session.id,
        showcaseMovie,
        watched,
        loading: state.ui.loading.moviesLoading
    };
};

const mdp = dispatch => {
    return {
        requestMovie: (movieId) => {
            return dispatch(requestMovie(movieId));
        },
        addToWatchList: (movieId) => {
            return dispatch(addToWatchList(movieId));
        },
        removeFromWatchList: (watchId) => {
            return dispatch(removeFromWatchList(watchId));
        }
    };
};

export default withRouter(connect(msp, mdp)(Showcase));