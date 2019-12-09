import React from "react";
import ReactDOM from "react-dom";
import * as SessionAPIUtil from "./util/session_api_util";
import configureStore from "./store/store";
import Root from "./components/root";



document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
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

  // window.login = SessionAPIUtil.login;
  // window.signup = SessionAPIUtil.signup;
  // window.logout = SessionAPIUtil.logout;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});