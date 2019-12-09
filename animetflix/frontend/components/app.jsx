import React from "react";
import {Link, Route} from "react-router-dom";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import BrowseContainer from "./browse/browse_container";
import {AuthRoute, ProtectedRoute} from "../util/route_util";

const App = () => (
  <main>
    <h1>ANIMETFLIX</h1>
    <AuthRoute path="/login" component={LoginFormContainer} /> 
    <AuthRoute path="/signup" component={SignupFormContainer} /> 
    <ProtectedRoute path="/browse" component={BrowseContainer} />

  </main>
);

export default App;