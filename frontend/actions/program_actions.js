import * as ProgramAPIUtil from "../util/program_api_util";

export const RECEIVE_ALL_PROGRAMS = "RECEIVE_ALL_PROGRAMS";
export const RECEIVE_SEARCHED_PROGRAMS = "RECEIVE_SEARCHED_PROGRAMS";
export const RECEIVE_PROGRAM = "RECEIVE_PROGRAM";
export const RECEIVE_WATCHLIST_PROGRAMS = "RECEIVE_WATCHLIST_PROGRAMS";
export const RECEIVE_WATCHLIST_ERRORS = "RECEIVE_WATCHLIST_ERRORS";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";
export const START_LOADING_PROGRAMS = "START_LOADING_PROGRAMS";

export const receiveAllPrograms = (programs) => {
  return { 
    type: RECEIVE_ALL_PROGRAMS,
    programs
  };
};


export const receiveProgram = (program) => {
  return {
    type: RECEIVE_PROGRAM,
    program
  };
};

//////FOR SEARCH PAGE
export const receiveSearchedPrograms = (payload) => {
  return {
    type: RECEIVE_SEARCHED_PROGRAMS,
    payload
  };
};

export const receiveSearchErrors = (errors) => {
  return {
    type: RECEIVE_SEARCH_ERRORS,
    errors
  };
};
/////////

//////FOR WATCHLIST
export const receiveWatchlistPrograms = (programs) => {

  return {
    type: RECEIVE_WATCHLIST_PROGRAMS,
    programs
  };
};

export const receiveWatchlistErrors = (errors) => {
  return {
    type: RECEIVE_WATCHLIST_ERRORS,
    errors
  };
};
/////////

///////FOR LOADING

export const startLoadingPrograms = () => {
  return {
    type: START_LOADING_PROGRAMS
  };
};

///////



export const requestAllPrograms = () => dispatch => {
  dispatch(startLoadingPrograms());

  return ProgramAPIUtil.fetchPrograms().then((programs) => {
    return dispatch(receiveAllPrograms(programs));
  });
};

export const requestProgramsByGenres = (genreIds) => dispatch => {
  dispatch(startLoadingPrograms());

  return ProgramAPIUtil.fetchProgramsByGenres(genreIds).then(programs => {
    return dispatch(receiveAllPrograms(programs));
  });
};

export const requestProgramsByType = (type) => dispatch => {
  dispatch(startLoadingPrograms());

  return ProgramAPIUtil.fetchProgramsByType(type).then(programs => {
    return dispatch(receiveAllPrograms(programs));
  });
};

export const requestProgram = (programId) => dispatch => {
  return ProgramAPIUtil.fetchProgram(programId).then((program) => {
    return dispatch(receiveProgram(program));
  });
};


//////FOR SEARCH PAGE
export const requestSearchedPrograms = (searchQuery) => dispatch => {
  dispatch(startLoadingPrograms());

  return ProgramAPIUtil.searchPrograms(searchQuery).then((payload) => {
    return dispatch(receiveSearchedPrograms(payload));
  }, (errors) => {
    return dispatch(receiveSearchErrors(errors.responseJSON));
  });
};


//////FOR WATCHLIST PAGE

export const requestWatchlistPrograms = (profileId) => dispatch => {
  dispatch(startLoadingPrograms());

  return ProgramAPIUtil.watchlistPrograms(profileId).then((programs) => {
    return dispatch(receiveWatchlistPrograms(programs));
  }, (errors) => {
    return dispatch(receiveWatchlistErrors(errors.responseJSON));
  });
};

