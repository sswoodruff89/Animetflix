export const fetchLikes = (profileId) => {
    return $.ajax({
        method: "GET",
        url: "/api/watchlists",
        data: { profileId }
    });
};

export const createWatch = (programId) => {
    return $.ajax({
        method: "POST",
        url: `/api/programs/${programId}/watchlists`
        // data: {user_id: userId}
    });
};

export const deleteWatch = (watchlistId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/watchlists/${watchlistId}`
    });
};