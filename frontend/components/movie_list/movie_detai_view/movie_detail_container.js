import { connect } from "react-redux";
import { requestMovie } from "../../../actions/movies_actions";
import MovieDetail from "./movie_detail";
import {withRouter} from "react-router-dom";


const msp = (state, ownProps) => {
  let movie;
  if (ownProps.home) {
    movie = state.entities.movies[ownProps.movieId] || {};
  } else {
    movie = state.entities.movies[ownProps.match.params.movieId];
  }
  debugger
  let genres = (movie.genreIds && movie.genreIds[0]) ? movie.genreIds.map((id) => {
    return state.entities.genres[id].name;
  }) : [];
  
  let displayType = (ownProps.history && ownProps.history.location.pathname.includes("search")) ? "search" : "browse";


  return {
    movie,
    genres,
    displayType
  };
};

const mdp = (dispatch) => {
  return {
    requestMovie: (movieId) => {
      return dispatch(requestMovie(movieId));
    }
  };
};

export default connect(msp, mdp)(MovieDetail);