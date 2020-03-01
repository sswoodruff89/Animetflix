import NavBar from "./navbar";
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";
import { requestAllProfiles, requestProfile } from "../../actions/profile_actions";
import { requestGenres } from "../../actions/genre_actions";
import { fetchLikes } from "../../actions/like_actions";
import {
  requestAllPrograms,
  requestProgramsByGenres,
  startLoadingPrograms,
  endLoadingPrograms
} from "../../actions/program_actions";
import { fetchWatchlist } from "../../actions/watchlist_actions";

const msp = (state, ownProps) => {
  return {
    session: state.session.id,
    currentProfile: state.entities.profiles[state.session.profileId],
    profiles: Object.values(state.entities.profiles)
  };
};

const mdp = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    requestAllProfiles: () => {
      return dispatch(requestAllProfiles());
    },
    requestProfile: (profileId) => {
      return dispatch(requestProfile(profileId));
    },
    requestGenres: () => {
      return dispatch(requestGenres());
    },
    requestAllPrograms: () => {
      return dispatch(requestAllPrograms());
    },
    requestProgramsByGenres: (genreIds) => {
      return dispatch(requestProgramsByGenres(genreIds));
    },
    fetchWatchlist: (profileId) => {
      return dispatch(fetchWatchlist(profileId));
    },
    fetchLikes: (profileId) => {
      return dispatch(fetchLikes(profileId));
    },
    startLoadingPrograms: () => {
      return dispatch(startLoadingPrograms());
    },
    endLoadingPrograms: () => {
      return dispatch(endLoadingPrograms());
    }
  };
};

export default connect(msp, mdp)(NavBar);