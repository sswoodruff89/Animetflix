import React from "react";

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.profile;
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        if (this.props.profileId !== undefined) {
            this.props.requestProfile(this.props.profileId);
        }
    }

    handleInput(e) {
        debugger
        let name = e.target.value;
        this.setState({name});
    }

    renderForm(profile, type) {
        if (type === "new") {
            return (
                <section className="profile-fill-out-form">
                    <div className="form-heading">
                        <h2>Add Profile</h2>
                        <span>Add a profile for another person to watch Animetflix</span>
                    </div>

                    <div className="form-container">

                        <div className="profile-icon">
                            <div className="profile-edit">
                                <span>
                                </span>
                            </div>
                        </div>

                        <input type="text"
                            value={profile.name}
                            // placeholder="Name"
                            className="prof-name-input"
                            onChange={this.handleInput} />

                        <div className="prof-form-buttons">
                            <button className="add-profile">
                                CONTINUE
                            </button>
                            <button className="cancel">
                                CANCEL
                            </button>
                        </div>

                    </div>
                </section>
            )
        } else {
          return (
            <section className="profile-fill-out-form">
                <div className="form-heading">
                    <h2>Edit Profile</h2>
                </div>

                <div className="form-container">
      
                        <div className="profile-icon">
                            <div className="profile-edit">
                                <span>
                                </span>
                            </div>
                        </div>

                        <input type="text"
                            value={profile.name}
                            placeholder="Name"
                            className="prof-name-input" 
                            onChange={this.handleInput}/>

                        <div className="prof-form-buttons">
                            <button className="save-profile">
                                SAVE
                            </button>
                            <button className="cancel">
                                CANCEL
                            </button>
                            <button className="delete">
                                DELETE
                            </button>
                        </div>

                </div>
            </section>
          )}
    }

    render() {
        let {profile, formType} = this.props;
        debugger
        return (
           <>
                {this.renderForm(profile, formType)}
           </>
        )
    }
}

export default ProfileForm;