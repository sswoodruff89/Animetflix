import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import BrowseContainer from "./browse/browse_container";
import HomePage from "./homepage";
import NavBar from "./navbar/navbar";
import {AuthRoute, ProtectedRoute} from "../util/route_util";

const App = () => {
  return (
    <main>
    
    <Switch>
      <Route path="/browse" component={NavBar}/>

      <Route path="/" render={() => {
        return(
          <header>
            <Link to="/">
              <img className="logo" src={window.logo} width="40" alt="logo" />
            </Link>
            <Route exact path="/" render={() => <Link to="/login"><button className="header-button" type="submit">Sign In</button></Link>} />
          </header>
        )
      }
    } />
      </Switch>
      
      
      <AuthRoute exact path="/" component={HomePage} /> 

      <AuthRoute path="/login" component={LoginFormContainer} /> 
      <AuthRoute path="/signup" component={SignupFormContainer} /> 
      <ProtectedRoute path="/browse" component={BrowseContainer} />

    </main>
  );
}

export default App;