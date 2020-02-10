import Browse from "./browse"
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { requestGenres } from "../../actions/genre_actions";
import { requestAllPrograms } from "../../actions/program_actions";
import { fetchWatchlist } from "../../actions/watchlist_actions";
import { sortByListLength, sortByDateAdded } from "../../reducers/sort_selector";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";



const msp = (state, ownProps) => {
  let genres = Object.values(state.entities.genres);

  if (genres.length > 0) {
    genres = sortByListLength(genres);
  }

  let watchlist = Object.values(state.entities.watchlists);

  if (watchlist.length > 0 ) {
    watchlist = sortByDateAdded(watchlist);
  }

  // let randomProgramId = Math.floor(Math.random() * 31);

  // let showcaseProgram = state.entities.programs[randomProgramId];
  // let watched = (showcaseProgram && state.entities.watchlists[showcaseProgram.id]) ?
  //   state.entities.watchlists[showcaseProgram.id] : null;

  return {
    session: state.session.id,
    // showcaseProgram: state.entities.programs[randomProgramId],
    watchlist,
    profileId: state.session.profileId,
    // watched,
    genres,
    loading: state.ui.loading.programsLoading
  };
};

const mdp = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    requestGenres: () => {
      return dispatch(requestGenres());
    },
    requestAllPrograms: () => {
      return dispatch(requestAllPrograms());
    },
    fetchWatchlist: () => {
      return dispatch(fetchWatchlist());
    },
    addToWatchList: (programId) => {
      return dispatch(addToWatchList(programId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    }  
  };
};

export default connect(msp, mdp)(Browse);