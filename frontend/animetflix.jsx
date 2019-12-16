import React from "react";
import ReactDOM from "react-dom";
import * as SessionAPIUtil from "./util/session_api_util";
import * as MovieAPIUtil from "./util/movie_api_util";
import * as SortSelector from "./reducers/sort_selector";
import {requestAllMovies, requestMovie, requestSearchedMovies} from "./actions/movies_actions";
import {requestGenres} from "./actions/genre_actions";
import configureStore from "./store/store";
import Root from "./components/root";



document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        movies: {},
        genres: {},
        users: {[window.currentUser.id]: window.currentUser},
        search: []
      },
      session: {id: window.currentUser.id}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
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

  // window.login = SessionAPIUtil.login;
  // window.signup = SessionAPIUtil.signup;
  // window.logout = SessionAPIUtil.logout;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});