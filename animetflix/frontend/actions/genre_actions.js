import {fetchGenres} from "../util/movie_api_util";


export const RECEIVE_GENRES = "RECEIVE_GENRES";
export const START_LOADING_GENRES = "START_LOADING_GENRES";


export const receiveGenres = (genres) => {
  return {
    type: RECEIVE_GENRES,
    genres
  };
};

export const startLoadingGenres = () => {
  return {
    type: START_LOADING_GENRES
  };
};

export const requestGenres = () => dispatch => {
  dispatch(startLoadingGenres());
  return fetchGenres().then((genres) => {
    return dispatch(receiveGenres(genres));
  });
};