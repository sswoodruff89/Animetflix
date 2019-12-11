export const selectMoviesByGenre = (state = {}, genreId) => {
  if (!genreId) return;

  const genre = state.entities.genres[genreId];
  if (genre.movie_ids.length > 0) {
    return genre.movie_ids.map((movieId) => {
      return state.entities.movies[movieId];
    });
  }
};