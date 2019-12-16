import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestMovie } from "../../actions/movies_actions";
import MovieListItem from "./movie_list_item";

const msp = (state, ownProps) => {
  let genres = (ownProps.movie.genreIds.length > 0 && ownProps.movie.genreIds[0] !== undefined) ? ownProps.movie.genreIds.map((id) => {
    return state.entities.genres[id].name;
  }) : [];

  return {
    movie: ownProps.movie,
    displayType: ownProps.displayType,
    genres
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