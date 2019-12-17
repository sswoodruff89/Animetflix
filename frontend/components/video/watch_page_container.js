import { connect } from 'react-redux';
import { requestMovie } from "../../actions/movies_actions";
import WatchPage from "./watch_page";


const msp = (state, ownProps) => {
  return {
    movie: state.entities.movies[ownProps.match.params.movieId]
  };
};

const mdp = dispatch => {
  return {
    requestMovie: (movieId) => {
      return dispatch(requestMovie(movieId));
    }
  };
};

export default connect(msp, mdp)(WatchPage);
