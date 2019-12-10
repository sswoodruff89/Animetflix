import React from "react";
import {Link} from "react-router-dom";

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    // this.dropDownToggle = this.dropDownToggle.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  // dropDownToggle(type) {
  //   document.querySelector(`.${type}-drop-down`).classList.toggle("hidden");
  // }


  render() {

    return (
      <header className="browse-nav">
        <nav className="left-nav">
          <Link to="/browse">
            <img className="browse-logo" src={window.logo} alt="logo" />
          </Link>
          <ul className="nav-movie-links">
            {/* ADD LINKS LATER */}
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>My List</li>
          </ul>
        </nav>

        <nav className="right-nav">
          <section className="search-field">
            <input 
              type="text"
              id="search-bar"

              />
            <i className="fas fa-search"></i>

          </section>
          <ul className="nav-profile-links">
            {/* ADD LINKS LATER */}
            <li>KIDS</li>
            <li>DVD</li>
            <li className="icon"><i className="fas fa-bell"></i></li>
            <li className="profile"></li>
          </ul>

          <aside className="profile-drop-down">
            <section className="profile-section">
              <span>Manage Profiles</span>
            </section>

            <ul>
              <li>Account</li>
              <li>Help Center</li>
              <li onClick={this.handleLogOut}>Sign out of Animetflix</li>
            </ul>

          </aside>

        </nav>
      </header>
    )
  }
}

export default NavBar;