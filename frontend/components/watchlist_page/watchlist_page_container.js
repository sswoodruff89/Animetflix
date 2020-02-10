import { connect } from 'react-redux';
import { fetchWatchlist } from "../../actions/watchlist_actions";
import { requestWatchlistPrograms } from "../../actions/program_actions";
import { sortByDateAdded } from "../../reducers/sort_selector";

import WatchlistPage from "./watchlist_page";


const msp = (state, ownProps) => {
    let watchlist = Object.values(state.entities.watchlists);

    if (watchlist.length > 0) {
        watchlist = sortByDateAdded(watchlist);
    }

    let programIds = Object.values(watchlist).map((watch) => {
        return watch.program_id
    });

    return {
        // programs: programs,
        // matches: "",
        profileId: state.session.profileId,
        programIds,
        watchlist
    };
};

const mdp = dispatch => {
    return {
        fetchWatchlist: (profileId) => {
            dispatch(fetchWatchlist(profileId));
        },
        requestWatchlistPrograms: (profileId) => {
            dispatch(requestWatchlistPrograms(profileId));
        }
    };
};


export default connect(msp, mdp)(WatchlistPage);