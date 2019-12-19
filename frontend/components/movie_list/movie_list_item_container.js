import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestMovie } from "../../actions/movies_actions";
import { addToWatchList, removeFromWatchList } from "../../actions/watchlist_actions";

import MovieListItem from "./movie_list_item";

const msp = (state, ownProps) => {

  let genreCheck = (Object.entries(state.entities.genres).length > 0);

  let genres = (ownProps.movie && genreCheck && ownProps.movie.genreIds.length > 0 && ownProps.movie.genreIds[0] !== undefined) ? ownProps.movie.genreIds.map((id) => {
    return state.entities.genres[id].name;
  }) : [];

  let watched = (ownProps.movie && state.entities.watchlists[ownProps.movie.id]) ?
    state.entities.watchlists[ownProps.movie.id] : null;

  return {
    movie: ownProps.movie,
    displayType: ownProps.displayType,
    watched,
    genres
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

export default withRouter(connect(msp, mdp)(MovieListItem));