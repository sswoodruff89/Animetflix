import React from "react";
import ReactDOM from "react-dom";
import * as SessionAPIUtil from "./util/session_api_util";
import * as MovieAPIUtil from "./util/movie_api_util";
import * as WatchAPIUtil from "./util/watchlist_api_util";
import * as SortSelector from "./reducers/sort_selector";
import {requestAllMovies, requestMovie, requestSearchedMovies} from "./actions/movies_actions";
import {requestGenres} from "./actions/genre_actions";
import {addToWatchList, removeFromWatchList, fetchWatchlist}  from "./actions/watchlist_actions";
import configureStore from "./store/store";
import Root from "./components/root";



document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    let session = (window.currentUser && window.currentUser.profile) ?
      { id: window.currentUser.id, profileId: window.currentUser.profile.id } :
      { id: window.currentUser.id}
    const preloadedState = {
      entities: {
        movies: {},
        genres: {},
        users: {[window.currentUser.id]: window.currentUser},
        search: []
      },
      session
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    delete window.currentProfile;
  } else {
    store = configureStore();
  }


  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.searchMovies = MovieAPIUtil.searchMovies;
  window.sortBySearch = SortSelector.sortBySearch;
  window.sortByScore = SortSelector.sortByScore;
  // window.fetchMovie = MovieAPIUtil.fetchMovie;
  // window.fetchGenres = MovieAPIUtil.fetchGenres;
  window.requestMovie = requestMovie;
  window.requestAllMovies = requestAllMovies;
  window.requestSearchedMovies = requestSearchedMovies;
  window.requestGenres = requestGenres;
  window.createWatch = WatchAPIUtil.createWatch;
  window.addToWatchList = addToWatchList;
  window.removeFromWatchList = removeFromWatchList;
  window.fetchWatchlist = fetchWatchlist;

  window.login = SessionAPIUtil.login;
  window.signup = SessionAPIUtil.signup;
  window.logout = SessionAPIUtil.logout;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});