import * as MovieAPIUtil from "../util/movie_api_util";

export const RECEIVE_ALL_MOVIES = "RECEIVE_ALL_MOVIES";
export const RECEIVE_SEARCHED_MOVIES = "RECEIVE_SEARCHED_MOVIES";
export const RECEIVE_MOVIE = "RECEIVE_MOVIE";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";
export const START_LOADING_MOVIES = "START_LOADING_MOVIES";

export const receiveAllMovies = (movies) => {
  return { 
    type: RECEIVE_ALL_MOVIES,
    movies
  };
};

export const receiveMovie = (movie) => {
  return {
    type: RECEIVE_MOVIE,
    movie
  };
};

//////FOR SEARCH PAGE
export const receiveSearchedMovies = (payload) => {
  return {
    type: RECEIVE_SEARCHED_MOVIES,
    payload
  };
};

export const receiveSearchErrors = (errors) => {
  return {
    type: RECEIVE_SEARCH_ERRORS,
    errors
  };
};
/////////


///////FOR LOADING

export const startLoadingMovies = () => {
  return {
    type: START_LOADING_MOVIES
  };
};

///////



export const requestAllMovies = () => dispatch => {
  dispatch(startLoadingMovies());

  return MovieAPIUtil.fetchMovies().then((movies) => {
    return dispatch(receiveAllMovies(movies));
  });
};

export const requestMovie = (movieId) => dispatch => {

  
  return MovieAPIUtil.fetchMovie(movieId).then((movie) => {
    return dispatch(receiveMovie(movie));
  });
};


//////FOR SEARCH PAGE
export const requestSearchedMovies = (searchQuery) => dispatch => {
  dispatch(startLoadingMovies());

  return MovieAPIUtil.searchMovies(searchQuery).then((payload) => {
    return dispatch(receiveSearchedMovies(payload));
  }, (errors) => {
    return dispatch(receiveSearchErrors(errors.responseJSON));
  });
};

