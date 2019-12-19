import Browse from "./browse"
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { requestGenres } from "../../actions/genre_actions";
import { requestAllMovies } from "../../actions/movies_actions";
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

  let randomMovieId = Math.floor(Math.random() * 30);

  let showcaseMovie = state.entities.movies[randomMovieId];
  let watched = (showcaseMovie && state.entities.watchlists[showcaseMovie.id]) ?
    state.entities.watchlists[showcaseMovie.id] : null;

  return {
    session: state.session.id,
    showcaseMovie: state.entities.movies[randomMovieId],
    watchlist,
    watched,
    genres,
    loading: state.ui.loading.moviesLoading
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
    requestAllMovies: () => {
      return dispatch(requestAllMovies());
    },
    fetchWatchlist: () => {
      return dispatch(fetchWatchlist());
    },
    addToWatchList: (movieId) => {
      return dispatch(addToWatchList(movieId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    }  
  };
};

export default connect(msp, mdp)(Browse);