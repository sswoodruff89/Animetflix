import React from "react";
// import {logout} from "../actions/session_actions";
import MovieListContainer from "../movie_list/movie_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route, Link, Switch } from "react-router-dom";
import BrowseShowcase from "./browse_showcase_container";
import LoadingPage from "../loading_page";
import Video from "../video/video";

class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.watched
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.renderWatchlist = this.renderWatchlist.bind(this);
  }

  componentDidMount() {
    this.props.fetchWatchlist(this.props.profileId);
    this.props.requestGenres();
    this.props.requestAllMovies();
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
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

  renderWatchlist(watchlist) {
    if (watchlist.length > 0) {
      return (
          <section className="list-and-detail-container">
            <section className="single-list-container" >
              <MovieListContainer listName={watchlist} listType="watchlist" />
            </section>
            <Route path={`/browse/list_watchlist/:movieId`}
              component={MovieDetailContainer}
              displayType="browse" />
          </section>
      )
    } else {
      return ""
    }
  }

  render() {
    const {genres, watchlist, loading} = this.props;

    if (loading) {
      return <LoadingPage />
    }

    // let firstMovieId = (genres[0] !== undefined) ? genres[0].movie_ids[0] : null;

    // let showcase = (this.props.history.location.pathname.includes("showcase")) ?
    //   (<Route path="/browse/showcase/:movieId" component={MovieDetailContainer} displayType="showcase"/>) :
    //   this.renderHomeDetails(this.props.showcaseMovie);

    return (
      <main className="browse-background">

        <section className="browse-display">
          <BrowseShowcase movieId={Math.floor(Math.random() * 31)}/>
        </section>

        <section className="lists-container">
          {this.renderWatchlist(watchlist)}

          {genres.map((genre, i) => {
            //remove condition when done formatting
            if (genre.movie_ids.length > 12) {
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