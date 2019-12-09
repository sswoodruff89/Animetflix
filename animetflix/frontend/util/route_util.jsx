import React from "react";
import {withRouter, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props => 
    !loggedIn ? <Component {...props} /> : <Redirect to="/browse" />
  }
 />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const msp = state => {
  return {
    loggedIn: Boolean(state.session.id)
  };
}

export const AuthRoute = withRouter(
  connect(msp)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(msp)(Protected)
);