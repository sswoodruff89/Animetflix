import * as WatchlistAPIUtil from "../util/watchlist_api_util";

export const RECEIVE_NEW_WATCH = "RECEIVE_NEW_WATCH";
export const REMOVE_WATCH = "REMOVE_WATCH";


export const receiveNewWatch = (watch) => {
  
  return {
    type: RECEIVE_NEW_WATCH,
    watch
  };
};


export const removeWatch = (movieId) => {
  return {
    type: REMOVE_WATCH,
    movieId
  };
};

export const addToWatchList = (movieId) => dispatch => {
  return WatchlistAPIUtil.createWatch(movieId).then((watch) => {
    return dispatch(receiveNewWatch(watch));
  });
};

export const removeFromWatchList = (watchId) => dispatch => {
  
  return WatchlistAPIUtil.deleteWatch(watchId).then((watch) => {
    return dispatch(removeWatch(watch.movie_id));
  });
};