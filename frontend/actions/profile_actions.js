import * as ProfileAPIUtil from "../util/profile_api_util";
import {startLoadingPrograms} from "./program_actions";

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

export const removeProfile = (profile) => {
    return {
        type: REMOVE_PROFILE,
        profile
    }
}

export const requestAllProfiles = () => dispatch => {
    return ProfileAPIUtil.fetchProfiles().then((profiles) => {
        return dispatch(receiveProfiles(profiles));
    });
};

export const requestProfile = (profileId) => dispatch => {
    dispatch(startLoadingPrograms());

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
    return ProfileAPIUtil.updateProfile(profile).then(profile => {
      return dispatch(receiveCurrentProfile(profile));
    });
};

export const deleteProfile = (profileId) => dispatch => {
    return ProfileAPIUtil.deleteProfile(profileId).then((profile) => {
        return dispatch(removeProfile(profile));
    })
}


