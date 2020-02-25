import { connect } from 'react-redux';
import { isEmpty } from "lodash";
import { requestGenres } from "../../actions/genre_actions";
import { requestSearchedPrograms } from "../../actions/program_actions";
import {sortBySearch} from "../../reducers/sort_selector";
import SearchPage from "./search_page";

const msp = (state, ownProps) => {
  let {programIds, searchlist} = state.entities.search; 

  if (programIds && programIds.length > 0) {
    programIds = sortBySearch(state.entities.programs, programIds, ownProps.match.params.searchQuery);
  }

  let genresLoaded = isEmpty(state.entities.genres) ? false : true;


  return {
    programIds,
    searchlist,
    errors: state.errors.search,
    genresLoaded
  };
};

const mdp = dispatch => {
  return {
    requestSearchedPrograms: searchQuery => {
      dispatch(requestSearchedPrograms(searchQuery));
    },
    requestGenres: () => {
      dispatch(requestGenres());
    }
  };
};


export default connect(msp, mdp)(SearchPage);