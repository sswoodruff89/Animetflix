import React from "react";
import { Link } from "react-router-dom";

class MovieListItem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const movie = (this.props.movie) ? this.props.movie : {};
    // let bullet = <span>•</span>
    let genres = (movie.genres) ? (
    
        movie.genres.slice(0, 3).map((genre, i) => {
          let bullet = (i > 0) ? (<span>•</span>) : "";
          return (
            <div key={i}>
              {bullet}
            <li className={`genre${i}`} key={i}>{genre}</li>
            </div>
          )
        })
    ) : "";

    return (
      <li className="movie-item">
        <img src="https://i.ytimg.com/vi/oGTK1e1aewY/maxresdefault.jpg" alt=""/>

        <section className="movie-item-info">
            <h4>{movie.title}</h4>
            <aside className="rating-runtime">
              <span className="rating">{movie.rating}</span>
              <span>{movie.runtime}</span>
            </aside>
            <ul className="genres">
                {genres}
            
            </ul>

        </section>
        <section className="down-arrow-container">
          <Link to={`/browse/${this.props.genreId}/${movie.id}`}>
           <img className="down-arrow" src={window.downArrow} alt="down-arrow"/>
          </Link>
        </section>

      </li>
    )
  }
}

export default MovieListItem;