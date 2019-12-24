import * as WatchlistAPIUtil from "../util/watchlist_api_util";
import {startLoadingMovies} from "./movies_actions";

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


export const removeWatch = (movieId) => {
  return {
    type: REMOVE_WATCH,
    movieId
  };
};



// export const fetchWatchlist = () => dispatch => {
//   // dispatch(startLoadingMovies());

//   return WatchlistAPIUtil.fetchWatchlist().then((watchlist) => {
//     return dispatch(receiveWatchlist(watchlist));
//   });
// };

// export const addToWatchList = (movieId) => dispatch => {
//   return WatchlistAPIUtil.createWatch(movieId).then((watch) => {
//     return dispatch(receiveNewWatch(watch));
//   });
// };

// export const removeFromWatchList = (watchId) => dispatch => {
  
//   return WatchlistAPIUtil.deleteWatch(watchId).then((watch) => {
//     return dispatch(removeWatch(watch.movie_id));
//   });
// };
export const fetchWatchlist = (profileId) => dispatch => {
  // dispatch(startLoadingMovies());

  return WatchlistAPIUtil.fetchWatchlist(profileId).then((watchlist) => {
    return dispatch(receiveWatchlist(watchlist));
  });
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