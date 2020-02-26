import Browse from "./browse"
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { requestGenres } from "../../actions/genre_actions";
import { fetchLikes, fetchDislikes } from "../../actions/like_actions";
import { requestAllPrograms, requestProgramsByGenres, startLoadingPrograms } from "../../actions/program_actions";
import { fetchWatchlist } from "../../actions/watchlist_actions";
import { sortByListLength, sortByDateAdded, sortByViewerPoints } from "../../reducers/sort_selector";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";



const msp = (state, ownProps) => {
  let genres = Object.values(state.entities.genres);
  let genreIds;
  if (genres.length > 0) {
    genres = sortByViewerPoints(genres);
    genreIds = genres.map((g) => g.id);
  }
  

  let watchlist = Object.values(state.entities.watchlists);

  if (watchlist.length > 0 ) {
    watchlist = sortByDateAdded(watchlist);
  }



  return {
    session: state.session.id,
    watchlist,
    profileId: state.session.profileId,
    programsLoaded: isEmpty(state.entities.programs),
    genres,
    genreIds,
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
    requestProgramsByGenres: (genreIds) => {
      return dispatch(requestProgramsByGenres(genreIds));
    },
    fetchWatchlist: (profileId) => {
      return dispatch(fetchWatchlist(profileId));
    },
    addToWatchList: (programId) => {
      return dispatch(addToWatchList(programId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    },
    fetchLikes: (profileId) => {
      return dispatch(fetchLikes(profileId));
    },
    fetchDislikes: (profileId) => {
      return dispatch(fetchDislikes(profileId));
    },
    startLoadingPrograms: () => {
      return dispatch(startLoadingPrograms());
    }
  };
};

export default connect(msp, mdp)(Browse);