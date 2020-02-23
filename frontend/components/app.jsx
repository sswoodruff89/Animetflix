import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import BrowseContainer from "./browse/browse_container";
import HomePageContainer from "./homepage_container";
import NavBarContainer from "./navbar/navbar_container";
import Footer from "./footer";
import SearchPageContainer from "./search_page/search_page_container";
import {AuthRoute, ProtectedRoute, ProfileProtectedRoute} from "../util/route_util";
import LoadingPage from "./loading_page";
import ProfilePageContainer from "./session_form/profile_container";
import TvPageContainer from "./tv_page/tv_page_container";
import MoviePageContainer from "./movie_page/movie_page_container";
import WatchListPageContainer from "./watchlist_page/watchlist_page_container";
import WatchPageContainer from "./video/watch_page_container";

const App = (props) => {

  return (
<>


    <main>
    <Route exact path="/watch/:programId" component={WatchPageContainer}/>

    <Switch>
      <Route path="/browse" component={NavBarContainer}/>
      <Route path="/search" component={NavBarContainer}/>
      <Route path="/watchlist" component={NavBarContainer}/>
      <Route path="/tv" component={NavBarContainer}/>
      <Route path="/movie" component={NavBarContainer}/>

      <Route path="/watch" render={() => {
        return (<div></div>)
      }} />

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

      <Route path="/search/:searchQuery" component={SearchPageContainer} />
      <Route path="/watchlist" component={WatchListPageContainer} />
      <Route path="/tv" component={TvPageContainer} />
      <Route path="/movie" component={MoviePageContainer} />
      <ProfileProtectedRoute path="/browse" component={BrowseContainer} />
 
    <Switch>
      <ProtectedRoute path="/profiles" component={ProfilePageContainer}/>
      <ProtectedRoute path="/manage_profiles" component={ProfilePageContainer}/>
    </Switch>

      {/* <ProtectedRoute path="/profile" component={ProfilePageContainer}/> */}

<Switch>
      {/* <Route path="/browse" render={() => {
        return (
        <footer className="browse-footer">
          <aside className="footer-stuff">
            <p>Questions? Call <a href="#">1-867-5309</a></p>

            <ul>
              <li key="1">
                <a href="https://github.com/sswoodruff89">GitHub</a>
              </li>
            </ul>
          </aside>
        </footer>
        )
      }} /> */}
      <Route path="/browse" component={Footer}/>
      <Route path="/watchlist" component={Footer}/>
      <Route path="/tv" component={Footer}/>
      <Route path="/movie" component={Footer}/>
      <Route path="/search" component={Footer}/>

      <Route path="/watch" render={() => {
        return (<div></div>)
      }} />

      {/* <Route path="/loading" render={() => {
        return (<div></div>)
      }} /> */}

      <Route path="/" render={() => {
        return (
          <footer className="home-footer">
            <aside className="footer-stuff">
              <p>
                Questions? Call <a href="#">1-867-5309</a>
              </p>

              <ul>
                <li>
                  <a href="https://github.com/sswoodruff89">GitHub</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/seanswoodruff/">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://sswoodruff89.github.io/">Portfolio</a>
                </li>
              </ul>
            </aside>
          </footer>
        );
      }} />
  </Switch>

    </main>

</>    
  );
}

export default App;