import {fetchGenres} from "../util/movie_api_util";

export const RECEIVE_GENRES = "RECEIVE_GENRES";

export const receiveGenres = (genres) => {
  return {
    type: RECEIVE_GENRES,
    genres
  };
};

export const requestGenres = () => dispatch => {
  return fetchGenres().then((genres) => {
    return dispatch(receiveGenres(genres));
  });
};