import { connect } from 'react-redux';
import { requestSearchedPrograms } from "../../actions/program_actions";
import {sortBySearch} from "../../reducers/sort_selector";
import SearchPage from "./search_page";

const msp = (state, ownProps) => {
  let {programIds, searchlist} = state.entities.search; 
  // let programIds;
  if (programIds && programIds.length > 0) {
    programIds = sortBySearch(state.entities.programs, programIds, ownProps.match.params.searchQuery);
  }
  

  return {
    // programs: programs,
    // matches: "",
    programIds,
    searchlist,
    errors: state.errors.search
  };
};

const mdp = dispatch => {
  return {
    requestSearchedPrograms: (searchQuery) => {
      dispatch(requestSearchedPrograms(searchQuery));
    }
  };
};


export default connect(msp, mdp)(SearchPage);