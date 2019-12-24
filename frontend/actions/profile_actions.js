import * as ProfileAPIUtil from "../util/profile_api_util";

export const RECEIVE_CURRENT_PROFILE = "RECEIVE_CURRENT_PROFILE";
export const RECEIVE_PROFILES = "RECEIVE_PROFILES";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

export const receiveCurrentProfile = (profile) => {
    return {
        type: RECEIVE_CURRENT_PROFILE,
        profile
    };
};

export const receiveProfiles = (profiles) => {
    return {
        type: RECEIVE_PROFILES,
        profiles
    };
};

export const removeProfile = (profileId) => {
    return {
        type: REMOVE_PROFILE,
        profileId
    }
}

export const requestAllProfiles = () => dispatch => {
    return ProfileAPIUtil.fetchProfiles().then((profiles) => {
        return dispatch(receiveProfiles(profiles));
    });
};

export const requestProfile = (profileId) => dispatch => {
    return ProfileAPIUtil.fetchProfile(profileId).then((profile) => {
        return dispatch(receiveCurrentProfile(profile));
    });
};

export const createProfile = (profile) => dispatch => {
    return ProfileAPIUtil.createProfile(profile).then((profile) => {
        return dispatch(receiveCurrentProfile(profile));
    });
};

export const updateProfile = (profile) => dispatch => {
    return ProfileAPIUtil.createProfile(profile).then((profile) => {
        return dispatch(receiveCurrentProfile(profile));
    });
};

export const deleteProfile = (profileId) => dispatch => {
    return ProfileAPIUtil.deleteProfile(profileId).then((profile) => {
        return dispatch(removeProfile(profile));
    })
}


