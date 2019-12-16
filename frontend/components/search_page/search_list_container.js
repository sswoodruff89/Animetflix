import {connect} from "react-redux";
import MovieList from "../movie_list/movie_list";

const msp = (state, ownProps) => {
  let movies = ownProps.movieIds.map((movieId) => {
    return state.entities.movies[movieId];
  });

  return {
    movies: movies,
    displayType: "search"
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