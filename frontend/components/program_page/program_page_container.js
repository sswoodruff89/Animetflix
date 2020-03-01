import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { requestGenres } from "../../actions/genre_actions";
import { fetchWatchlist } from "../../actions/watchlist_actions";
import {
  requestProgramsByType,
  requestWatchlistPrograms,
  endLoadingPrograms
} from "../../actions/program_actions";
import { sortByDateAdded } from "../../reducers/sort_selector"
import ProgramPage from "./program_page";

const msp = (state, ownProps) => {
  const displayType = ownProps.match.path.slice(1);
  let programIds = [];
  let genresLoaded = !isEmpty(state.entities.genres);

  if (displayType === "watchlist") {

        let watchlist = sortByDateAdded(Object.values(state.entities.watchlists));

        Object.values(watchlist).forEach(watch => {
            programIds.push(watch.program_id);
        });

  } else if (displayType === "tv" || displayType === "movie") {
      let programType = (displayType === "tv") ? "TV Show" : "Movie";

      Object.values(state.entities.programs).forEach(program => {
        if (program.program_type === programType) {
          programIds.push(program.id);
        }
      });

  }

  return {
    profileId: state.session.profileId,
    programIds,
    genresLoaded,
    displayType,
    loading: state.ui.loading.programsLoading
  };

};

const mdp = dispatch => {
  return {
    requestProgramsByType: type => {
      dispatch(requestProgramsByType(type));
    },
    fetchWatchlist: profileId => {
      dispatch(fetchWatchlist(profileId));
    },
    requestWatchlistPrograms: profileId => {
      dispatch(requestWatchlistPrograms(profileId));
    },
    requestGenres: () => {
      dispatch(requestGenres());
    },
    endLoadingPrograms: () => {
      dispatch(endLoadingPrograms());
    }
  };
};

export default connect(msp, mdp)(ProgramPage);
