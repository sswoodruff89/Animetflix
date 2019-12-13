import React from "react";
import MovieListItemContainer from "./movie_list_item_container";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
    this.state = {
      lastMovie: 6,
      nearEnd: (this.props.movies.length - 6) < 6,
      // listLoop: 1,
      tilEnd: ((this.props.movies.length - 6)),
      slideCount: 0
    };

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    // this.alterList = this.alterList.bind(this);
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();
    let { slideCount, lastMovie, tilEnd } = this.state;

    if (tilEnd <= 0) {
      slideCount = 0;
      lastMovie = 6;
      tilEnd = this.props.movies.length - 6;
    } else {
      slideCount += 1;
      lastMovie += (tilEnd < 6) ? tilEnd : 6;
      tilEnd -= 6;
    }

    this.setState({ lastMovie, slideCount, tilEnd });
  }

  toggleLeft(e) {
    e.preventDefault();
    let {slideCount, lastMovie, tilEnd} = this.state;

    if (slideCount > 0) {
      slideCount -= 1;
      tilEnd += 6;
      lastMovie -= (tilEnd < 6) ? tilEnd : 6;
      this.setState({slideCount, lastMovie, tilEnd});
    }

  }

  // alterList() {
  //   let numMovies = this.props.movies.length;
  //   let {listLoop, lastMovie} = this.state;

  //   if (((numMovies * listLoop) - lastMovie) < 12) {
  //     listLoop += 1;
  //     this.setState({listLoop});
  //   }
  // }

 


  render() {
    const {genre} = this.props;
    const {slideCount, tilEnd, lastMovie} = this.state;
    let movies = (this.props.movies) ? this.props.movies : [];

    /////Check if near end of list & duplicate list
    // if (this.props.movies) {
    //   movies = this.props.movies;

    //   if (listLoop > 1) {
    //     for (let i = 1; i <= listLoop; i++) {
    //       movies = movies.concat(movies);
    //     }
    //   }
    // } else {
    //   movies = [];
    // }
    ///////
        
    const hide = (slideCount === 0) ? "hidden" : "";

    ///how much to slide, depending on vicinity to End
    let slideMovePercentage;
    if (slideCount === 0) {
      slideMovePercentage = 0;
    } else {
      let endPercentage = (tilEnd && tilEnd < 6 && lastMovie % 6 > 0) ? (
        (100 - ((lastMovie % 6) / 6) * 100)
        ) : 0;
      slideMovePercentage = ((100 * (slideCount)) - (endPercentage));
    }
    //////

    ////Style attribute to move list left/right
    const listRange = {
      transform: `translateX(-${slideMovePercentage}%)`,
      transition: "all 0.8s ease-out"
    };


    //How to track what is showing
    // const showRange = (i) => {
    //   return (i === showIdx) ? "i0" : 
    //     (i === endIdx) ? "i7" :
    //     (i > showIdx && i <= endIdx) ? `i${i % 7}` : "";
    // };

    // const buttonPos = {
    //   transform: `translateX(${(90.5 * slideCount)}%)`,
    //   transition: "all 0.8s ease-out"
    // };

    // let movielist = this.renderList(movies);

    return(

<>
      <h3 className="list-name">{genre.name}</h3>

      <ul className="list-with-buttons">

          <button className={`toggle-list-button left ${hide}`}
            onClick={this.toggleLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>

        <ul className="movie-slider" style={listRange}>

          {/* {movielist} */}

            {
              movies.map((movie, i) => {
                return (
                  <li key={i} className="movie-item">

                    <MovieListItemContainer movie={movie} />

                  </li>
                )
              })
            }

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