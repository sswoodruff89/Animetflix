import { connect } from 'react-redux';
import { requestSearchedMovies } from "../../actions/movies_actions";
import {sortBySearch} from "../../reducers/sort_selector";
import SearchPage from "./search_page";

const msp = (state, ownProps) => {
  let {movieIds, searchlist} = state.entities.search; 
  // let movieIds;
  if (movieIds && movieIds.length > 0) {
    movieIds = sortBySearch(state.entities.movies, movieIds, ownProps.match.params.searchQuery);
  }
  

  return {
    // movies: movies,
    // matches: "",
    movieIds,
    searchlist,
    errors: state.errors.search
  };
};

const mdp = dispatch => {
  return {
    requestSearchedMovies: (searchQuery) => {
      dispatch(requestSearchedMovies(searchQuery));
    }
  };
};


export default connect(msp, mdp)(SearchPage);