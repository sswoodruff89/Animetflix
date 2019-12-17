import { connect } from 'react-redux';
// import { requestSearchedMovies } from "../../actions/movies_actions";
// import { sortBySearch } from "../../reducers/sort_selector";
import WatchPage from "./watch_page";
const msp = (state, ownProps) => {
  return {
    movie: state.entities.movies[ownProps.match.params.movieId]
  };
};

// const mdp = dispatch => {
//   return {

//   }
// }

export default connect(msp)(WatchPage);
