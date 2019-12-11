import React from "react";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre

  render() {
    const {movies, genre} = this.props;

    return(
      <ul className="movie-list">
          {movies.map((movie) => {
            <section className="movie-thumb">
              <span>
                {movie.title}
              </span>
            </section>
          })}

      </ul>
    )
  }
}

export default MovieList;