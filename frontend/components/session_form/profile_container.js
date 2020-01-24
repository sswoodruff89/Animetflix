import { connect } from "react-redux";
import { requestProfile, requestAllProfiles } from "../../actions/profile_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import ProfilePage from "./profile_page";

const msp = (state, ownProps) => {
    let profiles = Object.values(state.entities.profiles);
    
    return {
        profiles
    }
}

const mdp = (dispatch) => {
    return {
        requestProfile: (profileId) => {
            return dispatch(requestProfile(profileId));
        },
        requestAllProfiles: () => {
           return dispatch(requestAllProfiles()); 
        },
        openModal: (modal) => {
            return dispatch(openModal(modal));
        },
        closeModal: () => {
            return dispatch(closeModal());
        }
        
    }
}

export default connect(msp, mdp)(ProfilePage);