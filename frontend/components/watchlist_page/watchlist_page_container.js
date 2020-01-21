import { connect } from 'react-redux';
import { fetchWatchlist } from "../../actions/watchlist_actions";
import { requestWatchlistMovies } from "../../actions/movies_actions";
import { sortByDateAdded } from "../../reducers/sort_selector";

import WatchlistPage from "./watchlist_page";


const msp = (state, ownProps) => {
    let watchlist = Object.values(state.entities.watchlists);

    if (watchlist.length > 0) {
        watchlist = sortByDateAdded(watchlist);
    }

    let movieIds = Object.values(watchlist).map((watch) => {
        return watch.movie_id
    });

    return {
        // movies: movies,
        // matches: "",
        profileId: state.session.profileId,
        movieIds,
        watchlist
    };
};

const mdp = dispatch => {
    return {
        fetchWatchlist: (profileId) => {
            dispatch(fetchWatchlist(profileId));
        },
        requestWatchlistMovies: (profileId) => {
            dispatch(requestWatchlistMovies(profileId));
        }
    };
};


export default connect(msp, mdp)(WatchlistPage);