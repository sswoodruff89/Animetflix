import { connect } from 'react-redux';
import { isEmpty } from "lodash"
import { requestGenres } from "../../actions/genre_actions";
import { fetchWatchlist } from "../../actions/watchlist_actions";
import { requestWatchlistPrograms, endLoadingPrograms } from "../../actions/program_actions";
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

    let genresLoaded = (isEmpty(state.entities.genres)) ? false : true;

    return {
      profileId: state.session.profileId,
      programIds,
      watchlist,
      genresLoaded,
      loading: state.ui.loading.programsLoading
    };
};

const mdp = dispatch => {
    return {
        fetchWatchlist: (profileId) => {
            dispatch(fetchWatchlist(profileId));
        },
        requestWatchlistPrograms: (profileId) => {
            dispatch(requestWatchlistPrograms(profileId));
        },
        requestGenres: () => {
            dispatch(requestGenres());
        },
        endLoadingPrograms: () => {
            dispatch(endLoadingPrograms());
        }
    };
};


export default connect(msp, mdp)(WatchlistPage);