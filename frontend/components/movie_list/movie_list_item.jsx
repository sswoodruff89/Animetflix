import React from "react";
import { Link } from "react-router-dom";

class MovieListItem extends React.Component{
  constructor(props) {
    super(props);

    this.detailsLink = this.detailsLink.bind(this);
  }

  detailsLink(displayType) {
    const movie = (this.props.movie) ? this.props.movie : {};

    if (displayType === "browse") {
      return (
        <Link to={`/browse/genre_${this.props.genreId}/${movie.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      )
    } else {
      return (
        <Link to={`/search/${this.props.match.params.searchQuery}/${this.props.listNum}/${movie.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      )
    }
  }

  render() {
    const movie = (this.props.movie) ? this.props.movie : {};
    let genres = (this.props.genres) ? (
        this.props.genres.slice(0, 3).map((genre, i) => {
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
      <>
        <img className="background-image" src="https://i.ytimg.com/vi/oGTK1e1aewY/maxresdefault.jpg" alt=""/>

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
          {this.detailsLink(this.props.displayType)}
        </section>

      </>
    )
  }
}

export default MovieListItem;