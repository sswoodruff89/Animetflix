import React from "react";
// import {logout} from "../actions/session_actions";
import MovieListContainer from "../movie_list/movie_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route, Link, Switch } from "react-router-dom";
import LoadingPage from "../loading_page";
import Video from "../video/video";

class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.watched
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.renderHomeDetails = this.renderHomeDetails.bind(this);
    this.renderShowcaseDetails = this.renderShowcaseDetails.bind(this);
    this.redirectShowcase = this.redirectShowcase.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
  }

  componentDidMount() {
    this.props.fetchWatchlist();
    this.props.requestGenres();
    this.props.requestAllMovies();
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  redirectShowcase(movie) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/browse/showcase/${movie.id}`);
    };
  }

  handleWatchList(e) {
    e.preventDefault();
    let watchStatus = this.state.watched;

    if (watchStatus) {
      this.props.removeFromWatchList(this.props.showcaseMovie.id);
    } else {
      this.props.addToWatchList(this.props.showcaseMovie.id);
    }
    this.setState({ watched: !watchStatus });
  }

  renderHomeDetails(movie) {
    if (movie) {
      clearTimeout(this.showcaseDisplay);

      let watchStatus = (this.state.watched) ? (
        <span className="button-icon">
            <i className="fas fa-check"></i>
        </span>
      ) : (
          <span className="button-icon">
              <i className="fas fa-plus"></i>
          </span>
      )
      return (
        <>
          <div className="vid-container">
              {/* <Video version="showcase" /> */}
          </div>
          <section className="showcase-container">
           

            <div className="logo-and-buttons">
              <div className={`showcase-logo-container`}>
                {/* <img className={`movie-logo ${tab}`} src={movie.logo} alt=""/> */}
                <img className={`movie-logo `} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/dcgr6jq-e77501a0-57a5-4004-aa2f-b912f3ed9b9d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4YmY0OWViLWYwMWQtNDg1MS04MTBhLTZhYTZmYzMxNzEwN1wvZGNncjZqcS1lNzc1MDFhMC01N2E1LTQwMDQtYWEyZi1iOTEyZjNlZDliOWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RQcx0ZILiVpao-0a3VhorEaJDPXQPa9tK8s7-6bXe8I" alt="" />
              </div>

              <div className="showcase-detail-buttons">
                <button className="showcase-play">
                  <Link to={`/watch/${movie.id}`} >
                    <span className="button-icon">&#9654;</span>
                    <span>Play</span>
                  </Link>
                </button>

                <button className="showcase-watchlist" onClick={this.handleWatchList}>
                  {watchStatus}
                  <span>My List</span>
                </button>

                <button className="showcase-more-info">
                  <Link to={`/browse/showcase/${movie.id}`} >
                    <span className="button-icon">&#x24D8;</span>
                    <span>More Info</span>
                  </Link>
                </button>
              </div>
            </div>
          </section>
          {/* }} /> */}
          {/* <Route path={`/showcase/:movieId`} component={MovieDetailContainer} displayType="showcase"/> */}
        </>
      )
    } else {
      this.showcaseDisplay = setTimeout(() => {
        this.renderHomeDetails(movie)
      }, 5000);
    }
  }

  renderShowcaseDetails(movie) {
    
    if (this.props.history.location.pathname.includes("showcase")) {
      return (
        <MovieDetailContainer displayType="showcase" /> 
      )
    } else {
      this.renderHomeDetails(movie);
    }
  }

  render() {
    const {genres, watchlist, loading} = this.props;

    if (loading) {
      return <LoadingPage />
    }

    // let firstMovieId = (genres[0] !== undefined) ? genres[0].movie_ids[0] : null;

    let showcase = (this.props.history.location.pathname.includes("showcase")) ?
      (<Route path="/browse/showcase/:movieId" component={MovieDetailContainer} displayType="showcase"/>) :
      this.renderHomeDetails(this.props.showcaseMovie);

    return (
      <main className="browse-background">

        <section className="browse-display">

          {/* {this.renderHomeDetails(this.props.showcaseMovie)} */}

          {/* {this.renderShowcaseDetails(this.props.showcaseMovie)} */}
          {showcase}
        </section>

        <section className="lists-container">
          <section className="list-and-detail-container">
            <section className="single-list-container" >
              <MovieListContainer listName={watchlist} listType="watchlist" />
            </section>
            <Route path={`/browse/list_watchlist/:movieId`}
              component={MovieDetailContainer}
              displayType="browse" />
          </section>

          {genres.map((genre, i) => {
            //remove condition when done formatting
            // if (genre.movie_ids.length > 12) {
            if (genre.name === "Action") {
            return (
                <section className="list-and-detail-container" key={i}>
                  <section className="single-list-container" >
                    <MovieListContainer listName={genre} listType="genre"/>
                  </section>
                    <Route path={`/browse/list_${genre.name}/:movieId`} 
                    component={MovieDetailContainer} 
                    key={genre.id}
                    displayType="browse"/>
              </section>
              )
          }
        })}

        </section>

      </main>
    );
  };
  
};

export default Browse;