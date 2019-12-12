import React from "react";

class MovieListItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const movie = (this.props.movie) ? this.props.movie : {};

    return (
      <>
        <img src="https://i.ytimg.com/vi/oGTK1e1aewY/maxresdefault.jpg" alt=""/>
        <p>
          {movie.title}
        </p>
      </>
    )
  }
}

export default MovieListItem;