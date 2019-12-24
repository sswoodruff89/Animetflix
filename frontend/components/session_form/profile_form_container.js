import ProfileForm from "./profile_form";
import { requestProfile, createProfile, updateProfile, deleteProfile } from "../../actions/profile_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const msp = (state, ownProps) => {
    let profile = state.entities.profiles[ownProps.profileId] || {name: ""};
    return {
        profile,
        profileId: ownProps.profileId,
        formType: ownProps.formType
    };
};

const mdp = dispatch => {
    return {
        requestProfile: (profileId) => {
            return dispatch(requestProfile(profileId));
        },
        createProfile: (profile) => {
            return dispatch(createProfile(profile));
        },
        updateProfile: (profile) => {
            return dispatch(updateProfile(profile));
        },
        deleteProfile: (profileId) => {
            return dispatch(deleteProfile(profileId));
        }
    };
};

export default withRouter(connect(msp, mdp)(ProfileForm));