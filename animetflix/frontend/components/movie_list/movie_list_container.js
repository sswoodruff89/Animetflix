import React from "react";
import {connect} from "react-redux";
import {receiveMovie} from '../../actions/movies_actions';
import {selectMoviesByGenre} from "../../reducers/movie_selector";
import MovieList from "./movie_list";

const msp = (state, ownProps) => {
  return {
    movies: selectMoviesByGenre(state, ownProps.genre.id)
  };
};

const mdp = (dispatch) => {
  return {
    receiveMovie: (movieId) => {
      return dispatch(receiveMovie(movieId));
    }
  };
};


export default connect(msp, mdp)(MovieList);

