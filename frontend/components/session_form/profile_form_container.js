import ProfileForm from "./profile_form";
import { requestProfile, createProfile, updateProfile, deleteProfile } from "../../actions/profile_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const msp = (state, ownProps) => {
    if (ownProps.formType === "new") {
        return {
          profile: {},
          formType: ownProps.formType,
          icon: state.ui.modal.icon
        };
    } else {
        return {
          profile: state.ui.modal.profile,
          profileId: state.ui.modal.profile.id,
          formType: ownProps.formType,
          icon: state.ui.modal.icon
        };

    }
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