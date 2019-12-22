import React from "react";
import {connect} from "react-redux";
import {receiveMovie} from '../../actions/movies_actions';
import {withRouter} from "react-router-dom";
// import {selectMoviesByGenre} from "../../reducers/movie_selector";
import MovieList from "./movie_list";

const msp = (state, ownProps) => {
  let movies

  if (ownProps.listType === "genre") {
    movies = (ownProps.listName.movie_ids.length > 0) ? ownProps.listName.movie_ids.map((movieId) => {
      return state.entities.movies[movieId];
    }) : [];
  } else {
    movies = (ownProps.listName.length > 0) ? ownProps.listName.map((watchedMovie) => {
      return state.entities.movies[watchedMovie.movie_id];
    }) : [];
  }

  return {
    movies: movies,
    displayType: "browse",
    listType: ownProps.listType
  };
};

const mdp = (dispatch) => {
  return {
    receiveMovie: (movieId) => {
      return dispatch(receiveMovie(movieId));
    }
  };
};


export default withRouter(connect(msp, mdp)(MovieList));

