import React from "react";
import ReactDOM from "react-dom";
import * as SessionAPIUtil from "./util/session_api_util";
import * as ProgramAPIUtil from "./util/program_api_util";
import * as WatchAPIUtil from "./util/watchlist_api_util";
import * as SortSelector from "./reducers/sort_selector";
import {requestAllPrograms, requestProgram, requestSearchedPrograms} from "./actions/program_actions";
import {requestGenres} from "./actions/genre_actions";
import {addToWatchList, removeFromWatchList, fetchWatchlist}  from "./actions/watchlist_actions";
import configureStore from "./store/store";
import Root from "./components/root";



document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser && window.currentProfile) {
    let preloadedState = {
      entities: {
        programs: {},
        genres: {},
        users: { [window.currentUser.id]: window.currentUser },
        profiles: { [window.currentProfile.id]: window.currentProfile },
        search: []
      },
      session: {id: window.currentUser.id, profileId: window.currentProfile.id, showcaseIdx: window.currentProfile.showcase_idx}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    delete window.currentProfile;
    
  } else if (window.currentUser && !window.currentProfile) {
    let preloadedState = {
      entities: {
        programs: {},
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


  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.searchPrograms = ProgramAPIUtil.searchPrograms;
  // window.sortBySearch = SortSelector.sortBySearch;
  // window.sortByScore = SortSelector.sortByScore;
  // window.fetchProgram = ProgramAPIUtil.fetchProgram;
  // window.fetchGenres = ProgramAPIUtil.fetchGenres;
  // window.requestProgram = requestProgram;
  // window.requestAllPrograms = requestAllPrograms;
  // window.requestSearchedPrograms = requestSearchedPrograms;
  // window.requestGenres = requestGenres;
  // window.createWatch = WatchAPIUtil.createWatch;
  // window.addToWatchList = addToWatchList;
  // window.removeFromWatchList = removeFromWatchList;
  // window.fetchWatchlist = fetchWatchlist;

  // window.login = SessionAPIUtil.login;
  // window.signup = SessionAPIUtil.signup;
  // window.logout = SessionAPIUtil.logout;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});