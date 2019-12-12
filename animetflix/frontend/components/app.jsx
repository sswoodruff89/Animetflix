import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import BrowseContainer from "./browse/browse_container";
import HomePageContainer from "./homepage_container";
import NavBarContainer from "./navbar/navbar_container";
import SearchPage from "./search_page/search_page";
import {AuthRoute, ProtectedRoute} from "../util/route_util";

const App = () => {
  return (
    <main>
    
    <Switch>
      <Route path="/browse" component={NavBarContainer}/>
      <Route path="/search" component={NavBarContainer}/>

      <Route path="/" render={() => {
        return(
          <header className="auth-header">
            <div className="logo-container">
              <Link to="/">
                <img className="logo" src={window.logo} alt="logo" />
              </Link>
            </div>
            <Route exact path="/" render={() => <Link to="/login"><button className="header-button" type="submit">Sign In</button></Link>} />
          </header>
        )
      }
    } />
    </Switch>
      
      
      <AuthRoute exact path="/" component={HomePageContainer} /> 

      <AuthRoute path="/login" component={LoginFormContainer} /> 
      <AuthRoute path="/signup" component={SignupFormContainer} /> 

      <Route path="/search/:searchQuery" component={SearchPage} />
      <ProtectedRoute path="/browse" component={BrowseContainer} />


      <footer className="home-footer">
        <aside className="footer-stuff">
          <p>Questions? Call <a href="#">1-867-5309</a></p>
          
          <ul>
            <li>
              <a href="https://github.com/sswoodruff89">GitHub</a>
            </li>
          </ul>
        </aside>

      </footer>



    </main>
  );
}

export default App;