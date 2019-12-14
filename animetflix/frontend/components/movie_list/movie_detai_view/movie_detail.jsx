import React from "react";


class MovieDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

  }

  componentDidMount() {
    this.props.requestMovie(this.props.match.params.movieId);
    // this.setState({open: true});
  }

  render() {
    let movie = this.props.movie || {};
    let genres = (movie.genres) ? movie.genres.join(", ") : "";
    
    return(

      <section className={`movie-detail-page`}>
        <section className="left-detail-container">
          <img className="movie-logo" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/dcgr6jq-e77501a0-57a5-4004-aa2f-b912f3ed9b9d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4YmY0OWViLWYwMWQtNDg1MS04MTBhLTZhYTZmYzMxNzEwN1wvZGNncjZqcS1lNzc1MDFhMC01N2E1LTQwMDQtYWEyZi1iOTEyZjNlZDliOWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RQcx0ZILiVpao-0a3VhorEaJDPXQPa9tK8s7-6bXe8I" alt=""/>
          
          <caption className="rating-runtime">
            <span className="rating">{movie.rating}</span>
            <span>{movie.runtime}</span>
          </caption>
          
          <aside className="description">
            {movie.description}
          </aside>

          <div className="detail-buttons">
            <button className="detail-play">
              <span>&#9654;</span>
              PLAY
            </button>
            <button className="detail-watchlist"> 
              <i className="fas fa-plus"></i>
              MY LIST
            </button>
          </div>

          <caption className="genre-cap">
            Genres: {genres}
          </caption>
        </section>

      </section>
    )

  }

}

export default MovieDetail;