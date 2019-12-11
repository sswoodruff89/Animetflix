import React from "react";
import MovieListItemContainer from "./movie_list_item_container";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
  }
  render() {
    const {genre} = this.props;
    const movies = (this.props.movies) ? this.props.movies : [];
    
    return(
      <section className="browse-list-container">
      <h3 className="list-name">{genre.name}</h3>
      <ul className="movie-list">
          {movies.map((movie, i) => {
            return (
                <MovieListItemContainer movie={movie} key={i}/>
            )
          }
        )}
      </ul>
    </section>
    )
  }
}

export default MovieList;