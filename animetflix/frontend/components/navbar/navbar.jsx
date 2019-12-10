import React from "react";
import {Link} from "react-router-dom";

class NavBar extends React.Component{

  render() {

    return (
      <header className="browse-nav">
        <nav className="left-nav">
          <Link to="/browse">
            <img className="browse-logo" src={window.logo} alt="logo" />
          </Link>
          <ul className="nav-movie-links">
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>My List</li>

          </ul>
        </nav>
      </header>
    )
  }
}

export default NavBar;