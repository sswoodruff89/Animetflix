import React from "react";

class MovieListItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const movie = (this.props.movie) ? this.props.movie : {};

    let genres = (movie.genres) ? (
      
        movie.genres.slice(0, 3).map((genre, i) => {
          return (
            <li className={`genre${i}`}>{genre}</li>
          )
        })
      
    ) : "";

    return (
      <>
        <img src="https://i.ytimg.com/vi/oGTK1e1aewY/maxresdefault.jpg" alt=""/>

        <aside className="movie-item-info">
            <h4>{movie.title}</h4>
            <ul>
              <li className="rating">{movie.rating}</li>
              <li>{movie.runtime}</li>
            </ul>
            <ul className="genres">
                {/* {movie.genres.slice(0, 3).map((genre, i) => {
                  return (
                    <li className={`genre${i}`}>{genre}</li>
                  )
                })} */}
                {genres}
            </ul>



        </aside>
        {/* <p>
          {movie.title}
        </p> */}
      </>
    )
  }
}

export default MovieListItem;