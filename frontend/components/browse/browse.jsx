import React from "react";
// import {logout} from "../actions/session_actions";
import MovieListContainer from "../movie_list/movie_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route } from "react-router-dom";
import LoadingPage from "../loading_page";

class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.props.requestGenres();
    this.props.requestAllMovies();
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  render() {
    const {genres, loading} = this.props;
    
    if (loading) {
      return <LoadingPage />
    }

    let firstMovieId = (genres[0] !== undefined) ? genres[0].movie_ids[0] : null;

    return (
      <main className="browse-background">
        {/* <MovieDetailContainer home="true" movieId={firstMovieId}/> */}

        <section className="lists-container">
          {genres.map((genre, i) => {
            //remove condition when done formatting
            // if (genre.movie_ids.length > 12) {
            if (genre.name === "Action") {
            return (
                <section className="list-and-detail-container" key={i}>
                  <section className="single-list-container" >
                    <MovieListContainer genre={genre} />
                  </section>
                    <Route path={`/browse/genre_${genre.id}/:movieId`} 
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