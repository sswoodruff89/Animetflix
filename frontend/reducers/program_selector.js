export const selectProgramsByGenre = (state = {}, genreId) => {
  if (!genreId) return;

  const genre = state.entities.genres[genreId];
  if (genre.program_ids.length > 0) {
    return genre.program_ids.map((programId) => {
      return state.entities.programs[programId];
    });
  }
};