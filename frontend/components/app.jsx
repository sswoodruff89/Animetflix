import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import BrowseContainer from "./browse/browse_container";
import HomePageContainer from "./homepage";
import NavBarContainer from "./navbar/navbar_container";
import Footer from "./footer";
import SearchPageContainer from "./search_page/search_page_container";
import {AuthRoute, ProtectedRoute, ProfileProtectedRoute} from "../util/route_util";
import ProfilePageContainer from "./session_form/profile_container";
import WatchPageContainer from "./video/watch_page_container";
import ProgramPageContainer from "./program_page/program_page_container";

const App = (props) => {

  return (
    <>
      <main>
        <Route exact path="/watch/:programId" component={WatchPageContainer} />

        <Switch>
          <Route
            path={["/browse", "/search", "/watchlist", "/tv", "/movie"]}
            component={NavBarContainer}
          />
          <Route
            path="/watch"
            render={() => {
              return <div></div>;
            }}
          />

          <Route
            path="/"
            render={() => {
              return (
                <header className="auth-header">
                  <div className="logo-container">
                    <Link to="/">
                      <img className="logo" src={window.logo} alt="logo" />
                    </Link>
                  </div>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Link to="/login">
                        <button className="header-button" type="submit">
                          Sign In
                        </button>
                      </Link>
                    )}
                  />
                </header>
              );
            }}
          />
        </Switch>

        <AuthRoute exact path="/" component={HomePageContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />

        <Switch>
          <Route path="/search/:searchQuery" component={SearchPageContainer} />

          <Route
            path={["/watchlist", "/tv", "/movie"]}
            component={ProgramPageContainer}
          />
          <ProfileProtectedRoute path="/browse" component={BrowseContainer} />
        </Switch>

        <Switch>
          <ProtectedRoute path="/profiles" component={ProfilePageContainer} />
          <ProtectedRoute
            path="/manage_profiles"
            component={ProfilePageContainer}
          />
        </Switch>

        <Switch>
          <Route
            exact path={"/watch", "/search"}
            render={() => {
              return <div></div>;
            }}
          />
          <Route
            exact path={["/", "/login", "/signup", "/browse", "/search", "/watchlist", "/tv", "/movie", "/search/:searchQuery"]}
            component={Footer}
          />


        </Switch>
      </main>
    </>
  );
}

export default App;