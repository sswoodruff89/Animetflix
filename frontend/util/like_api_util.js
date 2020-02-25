export const fetchLikes = (profileId) => {
    return $.ajax({
        method: "GET",
        url: "/api/likes",
        data: { profileId }
    });
};

export const createLike = (programId) => {
    return $.ajax({
        method: "POST",
        url: `/api/programs/${programId}/likes`
        // data: {user_id: userId}
    });
};

export const deleteLike = (likeId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/likes/${likeId}`
    });
};

export const fetchDislikes = (profileId) => {
    return $.ajax({
        method: "GET",
        url: "/api/dislikes",
        data: { profileId }
    });
};

export const createDislike = (programId) => {
    return $.ajax({
        method: "POST",
        url: `/api/programs/${programId}/dislikes`
    });
};

export const deleteDislike = (dislikeId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/dislikes/${dislikeId}`
    });
};