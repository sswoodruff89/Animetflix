import React from "react";
import MovieListItemContainer from "./movie_list_item_container";

class MovieList extends React.Component{
// maybe have a util function requesting backend for movies through this given genre
  constructor(props) {
    super(props);
    this.state = {
      isStart: true,
      firstShowingIndex: 0,
      slideCount: 0
    };
    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();
    // let {isStart, firstShowingIndex} = this.state;
    // isStart = (isStart) ? false : false;
    // firstShowingIndex += 7;
    // this.setState({isStart, firstShowingIndex});
    
    let { slideCount } = this.state;
    slideCount += 1;
    this.setState({ slideCount });
  }

  toggleLeft(e) {
    e.preventDefault();
    // let { isStart, firstShowingIndex } = this.state;
    // let { slideCount, firstShowingIndex } = this.state;
    // firstShowingIndex -= 7;
    // isStart = (firstShowingIndex === 0) ? true : false;
    // this.setState({ isStart, firstShowingIndex });
    let {slideCount} = this.state;
    if (slideCount > 0) {
      slideCount -= 1;
      this.setState({slideCount});
    }

  }


  render() {
    const {genre} = this.props;
    const movies = (this.props.movies) ? this.props.movies : [];
    // const isStart = (this.state.isStart) ? "hidden" : "";
    // const showIdx = this.state.firstShowingIndex;
    // const endIdx = showIdx + 7;
    const {slideCount} = this.state;
    const hide = (slideCount === 1) ? "hidden" : "";

    //How to track what is showing
    // const showRange = (i) => {
    //   return (i === showIdx) ? "i0" : 
    //     (i === endIdx) ? "i7" :
    //     (i > showIdx && i <= endIdx) ? `i${i % 7}` : "";
    // };
    const listRange = {
      transform: `translateX(-${(90.5 * slideCount)}%)`,
      transition: "all 0.8s ease-out"
    };


    return(
      <>

        <h3 className="list-name">{genre.name}</h3>
        
        <div className="movie-list-container">
          <button className={`toggle-list-button left ${hide}`}
              onClick={this.toggleLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>
        <ul className="movie-list" style={listRange}>

          
            {movies.map((movie, i) => {
              return (
                // <li key={i} className={`movie-thumb ${showRange(i)}`}>
                <li key={i} className={`movie-thumb`}>
                  <MovieListItemContainer movie={movie} />
                </li>
              )
            }
          )}

        </ul>
        <button className={`toggle-list-button right`}
          onClick={this.toggleRight}>
          <i className="fas fa-chevron-right"></i>
        </button>

      </div>
    </>
    )
  }
}

export default MovieList;