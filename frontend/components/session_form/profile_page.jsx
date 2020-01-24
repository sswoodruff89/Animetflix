import React from "react";
import ProfileFormContainer from "./profile_form_container";
import Modal from "../modal/modal";

const COLORS = {
    0: "red",
    1: "blue",
    2: "white",
    3: "green",
    4: "purple",
    5: "yellow"
};

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            manage: false,
            formOpen: false,
            formType: "",
            editProfId: null
        }
        this.renderProfiles = this.renderProfiles.bind(this);
        this.loginProfile = this.loginProfile.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
        this.renderManageProfiles = this.renderManageProfiles.bind(this);
        // this.renderProfileForm = this.renderProfileForm.bind(this);
    }

    componentDidMount() {
        if (!this.props.profile) {
            this.props.requestAllProfiles();
        }
    }

    loginProfile(e) {
        e.preventDefault();
        this.props.requestProfile(e.currentTarget.value).then(() => {
            this.props.history.push("/browse");
            // this.props.history.push("/profile");
        });;
    }

    toggleProfile(e) {
        e.preventDefault();
        if (this.props.history.location.pathname.includes("/profiles")) {
            this.props.history.push("/manage_profiles");
        } else {
            this.props.history.push("/profiles");
        }
        // this.setState({manage: true});
    }

    // renderProfileForm(type = "", profileId = null ) {
    //     return (e) => {
    //         e.preventDefault();
    //         if (!this.state.formOpen) {
    //             this.setState({formOpen: true, formType: type});
    //         } else {
    //             this.setState({formOpen: false, formType: "", profileId})
    //         }
    //     }
    // }


    

    renderProfiles(profiles, addProfile) {
        // let manage = this.props.history.location.pathname.includes("/manage")
        if (profiles && Object.values(profiles).length > 0) {
            return (
            <section className="profile-form">
                <div className="watching">Who's watching?</div >
                <ul className="profile-list">
                    {profiles.map((profile, i) => {
                        return (
                            <li key={i}
                                className="profile-block">
                                <button className="profile-button"
                                    value={profile.id}
                                    onClick={this.loginProfile}>

                                    <div className="profile-icon"
                                        style={{
                                            backgroundImage: `url(${window.miniLogos[i]})`,
                                            backgroundColor: `${COLORS[i]}`
                                        }}
                                    ></div>
                                    <span className="profile-name">
                                        {profile.name}
                                    </span>
                                </button>
                            </li>
                    )})}
                    {addProfile}
                </ul>
                <button className="manage"
                    onClick={this.toggleProfile}>
                    MANAGE PROFILES
                </button>
            </section>
            )
        }

    }

    renderManageProfiles(profiles, addProfile) {
        if (profiles) {

            return (
                <>
                <section className="profile-form">
                    <div className="watching">Manage Profiles:</div >
                    <ul className="profile-list">
                        {profiles.map((profile, i) => {
                            return (
                              <li key={i} className="profile-block">
                                <button
                                  className="profile-button"
                                  value={profile.id}
                                  onClick={() => this.props.openModal({ type: "editProfile", profile})}
                                  //   onClick={this.renderProfileForm("edit")}
                                >
                                  <div
                                    className="profile-icon"
                                    style={{
                                      backgroundImage: `url(${window.miniLogos[i]})`,
                                      backgroundColor: `${COLORS[i]}`
                                    }}
                                  >
                                    <div className="edit">
                                      <span>
                                        <i className="fas fa-pencil-alt"></i>
                                      </span>
                                    </div>
                                  </div>

                                  <span className="profile-name">
                                    {profile.name}
                                  </span>
                                </button>
                              </li>
                            );
                        })}
                        {addProfile}
                    </ul>
                    <button className="done"
                        onClick={this.toggleProfile}>
                        DONE
                </button>
                </section>
                </>
            )
        }
    }

    render() {
        let profiles = this.props.profiles;
        let manage = this.props.history.location.pathname.includes("/manage_profiles")
        let {formOpen, formType } = this.state;
        let addProfile =
          profiles.length < 6 ? (
            <li key="6" className="profile-block">
              <button
                className="profile-button"
                // value={profile.id}
                onClick={() => this.props.openModal({ type: "newProfile" })}
              >
                <div className="profile-icon add"></div>
                <span className="profile-name">Add Profile</span>
              </button>
            </li>
          ) : (
            ""
          );

        let profRender = (!manage) ? 
            this.renderProfiles(profiles, addProfile) :
            this.renderManageProfiles(profiles, addProfile);

        let profFormRender = (formOpen) ? 
            <ProfileFormContainer formType={formType}
                renderProfileForm={() => {this.renderProfileForm}} /> :
                profRender

        
        return (
            <main className="profile-page">
                <Modal />
                {profFormRender}
            </main>
            )
        }
}

export default ProfilePage;