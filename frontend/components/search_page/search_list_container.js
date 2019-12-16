import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import MovieList from "../movie_list/movie_list";

const msp = (state, ownProps) => {
  let movies = ownProps.list.map((id) => {
    return state.entities.movies[id];
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

export default withRouter(connect(msp, mdp)(MovieList));