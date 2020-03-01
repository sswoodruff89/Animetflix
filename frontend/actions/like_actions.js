import * as LikeAPIUtil from "../util/like_api_util";
import {startLoadingPrograms} from "./program_actions";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_NEW_LIKE = "RECEIVE_NEW_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const RECEIVE_DISLIKES = "RECEIVE_DISLIKES";
export const RECEIVE_NEW_DISLIKE = "RECEIVE_NEW_DISLIKE";
export const REMOVE_DISLIKE = "REMOVE_DISLIKE";



export const receiveLikes = (likes) => {
    return {
        type: RECEIVE_LIKES,
        likes
    };
};

export const receiveNewLike = (like) => {
    return {
        type: RECEIVE_NEW_LIKE,
        like
    };
};


export const removeLike = (programId) => {
    return {
        type: REMOVE_LIKE,
        programId
    };
};



export const fetchLikes = (profileId) => dispatch => {
    // dispatch(startLoadingPrograms());

    return LikeAPIUtil.fetchLikes(profileId).then((like) => {
        return dispatch(receiveLikes(like));
    });
};

export const addLike = (programId) => dispatch => {
    return LikeAPIUtil.createLike(programId).then((like) => {
        return dispatch(receiveNewLike(like));
    });
};

export const removeFromLikes = (likeId) => dispatch => {

    return LikeAPIUtil.deleteLike(likeId).then((like) => {
        return dispatch(removeLike(like.program_id));
    });
};

////////


export const receiveDislikes = (dislikes) => {
    return {
        type: RECEIVE_DISLIKES,
        dislikes
    };
};

export const receiveNewDislike = (dislike) => {
    return {
        type: RECEIVE_NEW_DISLIKE,
        dislike
    };
};


export const removeDislike = (programId) => {
    return {
        type: REMOVE_DISLIKE,
        programId
    };
};



export const fetchDislikes = (profileId) => dispatch => {
    // dispatch(startLoadingPrograms());

    return LikeAPIUtil.fetchDislikes(profileId).then((dislike) => {
        return dispatch(receiveDislikes(dislike));
    });
};

export const addDislike = (programId) => dispatch => {
    return LikeAPIUtil.createDislike(programId).then((dislike) => {
        return dispatch(receiveNewDislike(dislike));
    });
};

export const removeFromDislikes = (dislikeId) => dispatch => {

    return LikeAPIUtil.deleteDislike(dislikeId).then((dislike) => {
        return dispatch(removeDislike(dislike.program_id));
    });
};