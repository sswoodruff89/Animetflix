import React from "react";
import {connect} from "react-redux";
import {receiveMovie} from '../../actions/movies_actions';
import {withRouter} from "react-router-dom";
// import {selectMoviesByGenre} from "../../reducers/movie_selector";
import MovieList from "./movie_list";

const msp = (state, ownProps) => {
  let movies = ownProps.genre.movie_ids.map((movieId) => {
    return state.entities.movies[movieId];
  });
  
   return {
    movies: movies,
    displayType: "browse"
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

