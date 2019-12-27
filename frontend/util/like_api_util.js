export const fetchLikes = (profileId) => {
    return $.ajax({
        method: "GET",
        url: "/api/watchlists",
        data: { profileId }
    });
};

export const createWatch = (movieId) => {
    return $.ajax({
        method: "POST",
        url: `/api/movies/${movieId}/watchlists`
        // data: {user_id: userId}
    });
};

export const deleteWatch = (watchlistId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/watchlists/${watchlistId}`
    });
};