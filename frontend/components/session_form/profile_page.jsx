import React from "react";

class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            manage: false
        }
        this.renderProfiles = this.renderProfiles.bind(this);
        this.loginProfile = this.loginProfile.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
        this.renderManageProfiles = this.renderManageProfiles.bind(this);
    }

    componentDidMount() {
        debugger
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

                                    <div className="profile-icon"></div>
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
        debugger
        if (profiles) {

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
                                        {/* <div className="edit">
                                            <span>
                                                <i className="fas fa-pencil-alt"></i>
                                            </span>
                                        </div> */}

                                        <div className="profile-icon">
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
                            )
                        })}
                        {addProfile}
                    </ul>
                    <button className="done"
                        onClick={this.toggleProfile}>
                        DONE
                </button>
                </section>
            )
        }
    }

    render() {
        debugger
        let profiles = this.props.profiles;
        let manage = this.props.history.location.pathname.includes("/manage_profiles")
        let addProfile = (profiles.length < 5) ? (
            <li key="5"
                className="profile-block">
                <button className="profile-button"
                    // value={profile.id}
                    // onClick={this.loginProfile}
                    >
                <div className="profile-icon add">

                </div>
                <span className="profile-name">
                    Add Profile
                </span>
                </button>
            </li>
        ) : "";

        let profRender = (!manage) ? 
            this.renderProfiles(profiles, addProfile) :
            this.renderManageProfiles(profiles, addProfile);
        return (
            <main className="profile-page">
                {profRender}
            </main>
            )
        }
}

export default ProfilePage;