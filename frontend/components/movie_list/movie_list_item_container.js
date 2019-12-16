import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestMovie } from "../../actions/movies_actions";
import MovieListItem from "./movie_list_item";

const msp = (state, ownProps) => {
  return {
    movie: ownProps.movie,
  };
};

const mdp = dispatch => {
  return {
    requestMovie: (movieId) => {
      return dispatch(requestMovie(movieId));
    }
  };
};

export default withRouter(connect(msp, mdp)(MovieListItem));