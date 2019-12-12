import React from "react";
import MovieListItemContainer from "./movie_list_item_container";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
    this.state = {
      isStart: true
    };
  }


  render() {
    const {genre} = this.props;
    const movies = (this.props.movies) ? this.props.movies : [];
    const isStart = (this.state.isStart) ? "hidden" : "";

    return(
      <>
      <h3 className="list-name">{genre.name}</h3>

      <div className="movie-list-container">
      
        <button className={`toggle-list-button left ${isStart}`}>
          <i className="fas fa-chevron-left"></i>
        </button>

    
      <ul className="movie-list">
          {movies.map((movie, i) => {
            return (
                <MovieListItemContainer movie={movie} key={i}/>
            )
          }
        )}
      </ul>

      <button className={`toggle-list-button right`}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
    </>
    )
  }
}

export default MovieList;