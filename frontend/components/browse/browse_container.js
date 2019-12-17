import Browse from "./browse"
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { requestGenres } from "../../actions/genre_actions";
import { requestAllMovies } from "../../actions/movies_actions";
import { sortByListLength } from "../../reducers/sort_selector";



const msp = (state, ownProps) => {
  let genres = Object.values(state.entities.genres);

  if (genres.length > 0) {
    genres = sortByListLength(genres);
  }


  return {
    session: state.session.id,
    genres,
    loading: state.ui.loading.moviesLoading
  };
};

const mdp = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    requestGenres: () => {
      return dispatch(requestGenres());
    },
    requestAllMovies: () => {
      return dispatch(requestAllMovies());
    }
  };
};

export default connect(msp, mdp)(Browse);