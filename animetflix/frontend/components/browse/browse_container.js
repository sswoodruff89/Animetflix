import Browse from "./browse"
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { requestGenres } from "../../actions/genre_actions";
import { requestAllMovies } from "../../actions/movies_actions";



const msp = (state, ownProps) => {
  // let genres = Object.values(state.entities.genres);
  // genres = genres.sort((g1, g2) => {

  // })
  return {
    session: state.session.id,
    genres: Object.values(state.entities.genres)
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