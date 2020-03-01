import {fetchGenres} from "../util/program_api_util";
import {startLoadingPrograms} from "./program_actions";

export const RECEIVE_GENRES = "RECEIVE_GENRES";
export const START_LOADING_GENRES = "START_LOADING_GENRES";


export const receiveGenres = (genres) => {
  return {
    type: RECEIVE_GENRES,
    genres
  };
};



export const requestGenres = () => dispatch => {
  dispatch(startLoadingPrograms());

  return fetchGenres().then((genres) => {
    return dispatch(receiveGenres(genres));
  });
};