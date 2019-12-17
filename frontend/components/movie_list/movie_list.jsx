import React from "react";
import MovieListItemContainer from "./movie_list_item_container";
import Video from "../video/video";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
    this.state = {
      displayType: this.props.displayType,
      lastMovie: 6,
      nearEnd: (this.props.movies.length - 6) < 6,
      tilEnd: ((this.props.movies.length - 6)),
      slideCount: 0
      // firstIdx: 0, //Index, not place, of first movie in each slide
      // listLoop: 1,
    };

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    this.browseOrSearch = this.browseOrSearch.bind(this);
    // this.detailOpen = this.detailOpen.bind(this);
    // this.showRange = this.showRange.bind(this);
    // this.alterList = this.alterList.bind(this);
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();
    let { slideCount, lastMovie, tilEnd, firstIdx } = this.state;

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
    let {slideCount, lastMovie, tilEnd } = this.state;
    
    if (slideCount > 0) {
      slideCount -= 1;
      // firstIdx -= 6;
      tilEnd += 6;
      lastMovie -= (tilEnd < 6) ? tilEnd : 6;
      this.setState({slideCount, lastMovie, tilEnd});
    }
  }

  
  ///CHECKS IF A DETAIL PAGE IS OPEN
  detailOpen(i) {
    let detailMovieId = this.props.history.location.pathname.split("/");
    detailMovieId = parseInt(detailMovieId[detailMovieId.length - 1]);

    return (detailMovieId === i) ? "detail-open-true" : "detail-open-false";
  }


 ///RENDERS BASED ON BROWSE OR SEARCH
  browseOrSearch(displayType) {

    const genre = (this.props.genre) ? this.props.genre : "";
    const { slideCount, tilEnd, lastMovie } = this.state;
    let movies = (this.props.movies) ? this.props.movies : [];
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

    if (displayType === "search") {

      let searchQuery = this.props.match.params.searchQuery;
      let listNum = this.props.listNum;
      let checkOpenDetail = (this.props.history.location.pathname.includes(`${searchQuery}/${listNum}`)) ? true : false;

      return (
        <>
          <ul className="movie-slider search" >
            {movies.map((movie, i) => {
                if (movie) {
                  return (
                    <li key={i}
                      id={(i === 0 && !checkOpenDetail) ? "first-in-slide" : ""}
                      className={(checkOpenDetail) ? `movie-item-${this.detailOpen(movie.id)}` : "movie-item"}>

                      <MovieListItemContainer movie={movie} 
                        listNum={this.props.listNum}
                        displayType={displayType}/>

                    </li>
                  )
                }
              })}
          </ul>
        </>
      )
    } else {
      let checkOpenDetail = (this.props.history.location.pathname.includes(`genre_${genre.id}`)) ? true : false;

      return (
        <>
          <h3 className={`list-name`}>{genre.name}</h3>
          <ul className="list-with-buttons">

            <button className={`toggle-list-button left ${hide}`}
              onClick={this.toggleLeft}>
              <img className="left-arrow" src={window.leftArrow} alt="left-arrow" />

            </button>

            <ul className="movie-slider" style={listRange}>

              {
                movies.map((movie, i) => {
                  if (movie) {
                    return (
                      <li key={i}
                        id={(i === 0 && !checkOpenDetail) ? "first-in-slide" : ""}
                        className={(checkOpenDetail) ? `movie-item-${this.detailOpen(movie.id)}` : "movie-item"}>
                        <MovieListItemContainer movie={movie} displayType={displayType} genreId={genre.id} />
                      </li>
                    )
                  }
                })
              }

            </ul>

            <button className={`toggle-list-button right`}
              onClick={this.toggleRight}>
              <img className="right-arrow" src={window.rightArrow} alt="right-arrow" />
            </button>
          </ul>
        </>
      )
    }
  }





  render() {
    const {displayType} = this.state;

    return(
      <>
        {this.browseOrSearch(displayType)}
      </>
    )
  }
}

export default MovieList;



  // showRange(i) {
  //   let startIdx = this.state.lastMovie - 6;
  //   let endIdx = this.state.lastMovie;
  //   ///for thumbnail trailing off edge

  //   return (i === startIdx) ? "i0" :
  //     (i === endIdx) ? "i6" :
  //       (i > startIdx && i <= endIdx) ? `i${i % 6}` : "";
  // }

  // alterList() {
  //   let numMovies = this.props.movies.length;
  //   let {listLoop, lastMovie} = this.state;

  //   if (((numMovies * listLoop) - lastMovie) < 12) {
  //     listLoop += 1;
  //     this.setState({listLoop});
  //   }
  // }

     // let movieItemClass = ;
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