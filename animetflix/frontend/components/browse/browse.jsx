import React from "react";
// import {logout} from "../actions/session_actions";
import MovieListContainer from "../movie_list/movie_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route } from "react-router-dom";

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
    const {genres} = this.props;

    return (
      <main className="browse-background">
        <section className="lists-container">
          {genres.map((genre, i) => {
            //remove condition when done formatting
            if (genre.name === "Action" || genre.name === "Sci-Fi") {
              return (
              <>
                <section className="single-list-container" key={i}>
                  <MovieListContainer genre={genre} />
                </section>
                  <Route path={`/browse/genre_${genre.id}/:movieId`} component={MovieDetailContainer} />
              </>
              )
          }
        })}

        </section>

      </main>
    );
  };
  
};

export default Browse;