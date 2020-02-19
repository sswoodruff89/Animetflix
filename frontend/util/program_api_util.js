export const fetchPrograms = () => {
  return $.ajax({
    method: "GET",
    url: "/api/programs"
  });
};

export const fetchProgram = (programId) => {
  return $.ajax({
    method: "GET",
    url: `/api/programs/${programId}`
  });
};

export const fetchGenres = () => {
  return $.ajax({
    method: "GET",
    url: "/api/genres"
  });
};

export const fetchProgramsByGenres = (genreIds) => {
  return $.ajax({
    method: "GET",
    url: "/api/programs",
    data: { genre_ids: genreIds }
  });
}

export const fetchProgramsByType = (type) => {
  return $.ajax({
    method: "GET",
    url: "/api/programs",
    data: { type: type }
  }); 
}

export const searchPrograms = (searchQuery) => {
  return $.ajax({
    method: "GET",
    url: "/api/programs/search",
    data: { search_query: searchQuery }
  });
};

export const watchlistPrograms = (profileId) => {
  return $.ajax({
    method: "GET",
    url: "/api/programs/watchlist",
    data: { profile_id: profileId }
  });
};
