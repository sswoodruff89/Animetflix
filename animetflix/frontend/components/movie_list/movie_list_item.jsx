import React from "react";

class MovieListItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const movie = (this.props.movie) ? this.props.movie : {};
    return (
      <li className="movie-thumb"s>
        <p>
          {movie.title}
        </p>
      </li>
    )
  }
}

export default MovieListItem;