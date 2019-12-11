export const selectMoviesByGenre = (state = {}, genreId) => {
  const movieIds = state.entities.genres[genreId].movie_ids

  if (movieIds.length > 0) {
    return movieIds.map((movieId) => {
      return state.entities.movies[movieId];
    });
  }
};