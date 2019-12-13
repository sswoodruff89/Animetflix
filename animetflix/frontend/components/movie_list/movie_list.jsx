import React from "react";
import MovieListItemContainer from "./movie_list_item_container";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
    this.state = {
      // isStart: true,
      // firstShowingIndex: 0,
      movies: this.props.movies,
      lastMovie: 6,
      slideCount: 0
    };
    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    this.alterList = this.alterList.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();
    let { slideCount, movies } = this.state;
    slideCount += 1;
    movies = this.alterList(movies);
    //checks if near end of list
    this.setState({ movies, slideCount });
  }

  toggleLeft(e) {
    e.preventDefault();
    let {slideCount, movies} = this.state;

    if (slideCount > 0) {
      slideCount -= 1;
      this.setState({slideCount});
    }

  }

  alterList(movies) {
    let numMovies = this.props.movies.length;
    return (numMovies - this.state.lastMovie < 12) ? movies.concat(movies) : movies;
  }

  renderList(movies) {
    if (movies[0] !== undefined) {
        movies.map((movie, i) => {
          debugger
          return (
          <li key={i} className="movie-item">

            <MovieListItemContainer movie={movie} />

          </li>
        )
      })
    }
  }


  render() {
    const {genre} = this.props;
    const movies = (this.state.movies[0] === undefined) ? [] : this.state.movies;
    debugger
    const {slideCount} = this.state;
    const hide = (slideCount === 0) ? "hidden" : "";

    //How to track what is showing
    // const showRange = (i) => {
    //   return (i === showIdx) ? "i0" : 
    //     (i === endIdx) ? "i7" :
    //     (i > showIdx && i <= endIdx) ? `i${i % 7}` : "";
    // };
    const listRange = {
      transform: `translateX(-${(84.5 * slideCount)}%)`,
      transition: "all 0.8s ease-out"
    };

    const buttonPos = {
      transform: `translateX(${(90.5 * slideCount)}%)`,
      transition: "all 0.8s ease-out"
    };

    let movielist = this.renderList(movies);


    return(

<>
        <h3 className="list-name">{genre.name}</h3>

        <ul className="list-with-buttons">

          <button className={`toggle-list-button left ${hide}`}
            onClick={this.toggleLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>
        <ul className="movie-slider" style={listRange}>

          {movielist}

          </ul>

          <button className={`toggle-list-button right`}
            onClick={this.toggleRight}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </ul>


</>
    )
  }
}

export default MovieList;