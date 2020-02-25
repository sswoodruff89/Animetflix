import React from "react";
import {Link} from "react-router-dom";

const COLORS = {
  0: "red",
  1: "blue",
  2: "white",
  3: "green",
  4: "purple",
  5: "yellow"
};

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query: {
        searchQuery: ""
      },
      dropDown: "",
      searchBar: "",
      searchBarClosing: false,
    };

    this.searchTimeout;
    this.handleLogOut = this.handleLogOut.bind(this);
    this.dropDropDown = this.dropDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.searchBarToggle = this.searchBarToggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.loginProfile = this.loginProfile.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.profiles).length <= 1) {
      this.props.requestAllProfiles();
    }
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  dropDropDown(e) {
    this.setState({ dropDown: "active" });
    this.dropDownTimeout = setTimeout(() => {
      this.setState({ dropDown: "" })
    }, 3000);
  }

  hideDropDown(e) {
    this.dropDownTimeout = setTimeout(() => {
      this.setState({ dropDown: "" });
    }, 2000);
  }

  searchBarToggle(e) {
    let searchBar = this.state.searchBar;

    if (this.state.query.searchQuery === "") {

      if (searchBar === "") { 
        this.setState({ searchBar: "active" })
      } else { 
        this.setState({searchBarClosing: true});
        setTimeout(() => {
          this.setState({ searchBar: "", searchBarClosing: false });
        }, 500);

      }
    }
  }

  handleInput(e) {
    clearTimeout(this.searchTimeout);
    
    let query = this.state.query;
    query.searchQuery = e.target.value;
    this.setState({ query });
    
    if (query.searchQuery === "") {
      this.props.history.push("/browse");
    } else {
      this.props.history.push(`/search/`);
      
      this.searchTimeout = setTimeout(() => {
        this.props.history.push(`/search/${query.searchQuery}`);

      }, 300);
    }
  }

  clearInput() {
    this.props.history.push("/browse");
    let query = {searchQuery: ""};
    this.setState({query});
    setTimeout(this.searchBarToggle, 50);
  }

  handleScroll(e) {
    this.setState({scrolling: true});
  }


  loginProfile(e) {
    e.preventDefault();
    let profileId = e.currentTarget.value;

    this.props.requestProfile(e.currentTarget.value).then(() => {
      this.props.fetchWatchlist(profileId);
      this.props.fetchLikes(profileId);
      this.props.requestGenres();
      // this.props.requestAllPrograms();
      // this.props.history.push("/profile");

    });
  }

  render() {
    if (!this.props.profileId) {
      return (
        <div></div>
      );
    }
    const {searchBar, searchBarClosing} = this.state;
    const {profileId, profiles} = this.props;
    const {searchQuery} = this.state.query;
    const closing = (searchBarClosing) ? "closing" : "";

    const inputBar = (searchBar === "active") ? (
      <input
        type="text"
        id="search-bar"
        placeholder="Titles, people, genres"
        className={closing}
        value={searchQuery}
        autoFocus={true}
        onBlur={this.searchBarToggle}
        onChange={this.handleInput} />
    ) : "";

    let queryFilled = (searchQuery === "") ? "" : "active";

    let browse = this.props.history.location.pathname.includes("browse") ? (
      <li key="0" className="current">
        Home
      </li>
    ) : (
      <Link to="/browse">
        <li key="0" className="link">
          Home
        </li>
      </Link>
    );

    let watchlist = this.props.history.location.pathname.includes(
      "watchlist"
    ) ? (
      <li key="3" className="current">
        My List
      </li>
    ) : (
      <Link to="/watchlist">
        <li key="3" className="link">
          My List
        </li>
      </Link>
    );

    let tv = this.props.history.location.pathname.includes("tv") ? (
      <li key="1" className="current">
        TV Shows
      </li>
    ) : (
      <Link to="/tv">
        <li key="1" className="link">
          TV Shows
        </li>
      </Link>
    );

    let movies = this.props.history.location.pathname.includes("movie") ? (
      <li key="2" className="current">
        Movies
      </li>
    ) : (
      <Link to="/movie">
        <li key="2" className="link">
          Movies
        </li>
      </Link>
    );

    return (
      <header className={`browse-nav ${scroll}`}>
        <nav className="left-nav">
          <Link to="/browse">
            <img className="browse-logo" src={window.logo} alt="logo" />
          </Link>
          <ul className="nav-program-links">
            {browse}
            {tv}
            {movies}
            {watchlist}
          </ul>
        </nav>

        <nav className="right-nav">
          <section className={`search-field ${searchBar}`}>
            <i className="fas fa-search" onClick={this.searchBarToggle}></i>
            {inputBar}
            <i
              className={`fas fa-times ${queryFilled}`}
              onClick={this.clearInput}
            ></i>
          </section>

          <ul className="nav-profile-links">
            {/* <li className="icon">
              <i className="fas fa-bell"></i>
            </li> */}

            <li
              className="profile"
              style={{
                backgroundImage: `url(${
                  window.miniLogos[profiles[profileId].profile_num - 1]
                })`,
                backgroundColor: `${
                  COLORS[profiles[profileId].profile_num - 1]
                }`
              }}
              onMouseOver={this.dropDropDown}
            ></li>
          </ul>

          {/* DROPDOWN MENU */}
          <aside
            className={`profile-drop-down ${this.state.dropDown}`}
            onMouseOver={() => {
              clearTimeout(this.dropDownTimeout);
            }}
            onMouseLeave={this.hideDropDown}
          >
            <section className="profile-section">
              <ul className="profile-list">
                {Object.values(profiles).map((profile, i) => {
                  if (profile.id !== profileId) {
                    return (
                      <li
                        key={i}
                        className="profile-item"
                        value={profile.id}
                        onClick={this.loginProfile}
                      >
                        <span
                          className="profile-thumbnail"
                          style={{
                            backgroundImage: `url(${
                              window.miniLogos[profile.profile_num - 1]
                            })`,
                            backgroundColor: `${
                              COLORS[profile.profile_num - 1]
                            }`
                          }}
                        ></span>
                        <span className="profile-link">{profile.name}</span>
                      </li>
                    );
                  }
                })}
              </ul>
              <span className="manage-profile">
                <Link to="/manage_profiles">Manage Profiles</Link>
              </span>
            </section>

            <ul>
              <li key="0">
                <a
                  href="https://www.linkedin.com/in/seanswoodruff/"
                  target="_blank"
                >
                  Account
                </a>
              </li>
              <li key="1">
                <a
                  href="https://github.com/sswoodruff89/Animetflix"
                  target="_blank"
                >
                  Help Center
                </a>
              </li>
              <li key="2" onClick={this.handleLogOut}>
                Sign out of Animetflix
              </li>
            </ul>
          </aside>
        </nav>
      </header>
    );
  }
}

export default NavBar;