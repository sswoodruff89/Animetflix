import * as WatchlistAPIUtil from "../util/watchlist_api_util";
import {startLoadingPrograms} from "./program_actions";

export const RECEIVE_WATCHLIST = "RECEIVE_WATCHLIST";
export const RECEIVE_NEW_WATCH = "RECEIVE_NEW_WATCH";
export const REMOVE_WATCH = "REMOVE_WATCH";



export const receiveWatchlist = (watchlist) => {
  return {
    type: RECEIVE_WATCHLIST,
    watchlist
  };
};

export const receiveNewWatch = (watch) => {
  return {
    type: RECEIVE_NEW_WATCH,
    watch
  };
};


export const removeWatch = (programId) => {
  return {
    type: REMOVE_WATCH,
    programId
  };
};



export const fetchWatchlist = (profileId) => dispatch => {
  // dispatch(startLoadingPrograms());

  return WatchlistAPIUtil.fetchWatchlist(profileId).then((watchlist) => {
    return dispatch(receiveWatchlist(watchlist));
  });
};

export const addToWatchList = (programId) => dispatch => {
  return WatchlistAPIUtil.createWatch(programId).then((watch) => {
    return dispatch(receiveNewWatch(watch));
  });
};

export const removeFromWatchList = (watchId) => dispatch => {
  
  return WatchlistAPIUtil.deleteWatch(watchId).then((watch) => {
    return dispatch(removeWatch(watch.program_id));
  });
};