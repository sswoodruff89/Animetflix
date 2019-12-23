import { connect } from "react-redux";
import { requestProfile, requestAllProfiles } from "../../actions/profile_actions";
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
        }
    }
}

export default connect(msp, mdp)(ProfilePage);