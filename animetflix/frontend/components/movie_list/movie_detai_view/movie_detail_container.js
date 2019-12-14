import { connect } from "react-redux";
import { requestMovie } from "../../../actions/movies_actions";
import MovieDetail from "./movie_detail";


const msp = (state, ownProps) => {
  return {
    movie: state.entities.movies[ownProps.match.params.movieId]
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