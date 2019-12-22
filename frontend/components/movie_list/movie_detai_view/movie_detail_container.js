import { connect } from "react-redux";
import { requestMovie } from "../../../actions/movies_actions";
import { addToWatchList, removeFromWatchList } from "../../../actions/watchlist_actions";
// import { requestGenres } from "../../../actions/genre_actions";
import MovieDetail from "./movie_detail";
import {withRouter} from "react-router-dom";


const msp = (state, ownProps) => {
   
  let movieId = ownProps.movieId || null;
  let movie = state.entities.movies[ownProps.match.params.movieId];

  let genreCheck = (Object.entries(state.entities.genres).length > 0);
  
  let genres = (movie && genreCheck && movie.genreIds.length > 0 && movie.genreIds[0]) ? movie.genreIds.map((id) => {
    return state.entities.genres[id].name;
  }) : [];
  
  let displayType = (ownProps.displayType === "showcase") ? "showcase" : 
    (ownProps.history.location.pathname.includes("search")) ? "search" : 
      "browse";
    
  let watched = (movie && state.entities.watchlists[movie.id]) ? 
    state.entities.watchlists[movie.id] : null;

  return {
    movie,
    movieId,
    genres,
    watched,
    displayType
  };
};

const mdp = (dispatch) => {
  return {
    requestMovie: (movieId) => {
       
      return dispatch(requestMovie(movieId));
    },
    addToWatchList: (movieId) => {
      return dispatch(addToWatchList(movieId));
    },
    removeFromWatchList: (watchId) => {
      return dispatch(removeFromWatchList(watchId));
    }      

  };
};

export default withRouter(connect(msp, mdp)(MovieDetail));