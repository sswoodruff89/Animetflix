import React from "react";

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile,
            nameActive: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    componentDidMount() {
        if (this.props.profileId !== undefined) {
            this.props.requestProfile(this.props.profileId);
        }
    }

    handleInput(e) {
        debugger
        let profile = this.state.profile;
        profile.name = e.target.value;
        this.setState({profile, nameActive: ""});
    }

    handleBlur(e) {
        debugger
        let name = this.state.profile.name;
        if (name === "") {
            this.setState({nameActive: "active"});
        }
    }

    handleCancel(e) {
        e.preventDefault();
        debugger
        this.props.renderProfileForm();
        // this.props.history.push("/profiles");
    }

    handleSumbit(formType) {
    
        return (e) => {
            e.preventDefault();
            let profile = this.state.profile;
            if (profile.name === "") {
                this.handleBlur(e);
            } else if (formType === "add") {
                this.props.createProfile(profile).then(() => {
                    this.props.history.push("/profiles");
                });
            } else {
                this.props.updateProfile(profile).then(() => {
                    this.props.history.push("/profiles");
                })
            }
        }
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteProfile(this.props.profile.id).then(() => {
            this.props.history.push("/profiles");
        })
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
                            placeholder="Name"
                            className={`prof-name-input ${this.state.nameActive}`}
                            autoFocus
                            onBlur={this.handleBlur}
                            onChange={this.handleInput} />
                        <p className={`prof ${this.state.nameActive}`}>Please enter a name</p>
                        <div className="prof-form-buttons">
                            <button className="add-profile"
                                onClick={this.handleSumbit(type)}
                            >
                                CONTINUE
                            </button>
                            <button className="cancel"
                                onClick={this.handleCancel}>
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
                        className={`prof-name-input ${this.state.nameActive}`}
                        onBlur={this.handleBlur}
                        onChange={this.handleInput}/>
                    <p className={`prof ${this.state.nameActive}`}>Please enter a name</p>

                    <div className="prof-form-buttons">
                        <button className="save-profile"
                            onClick={this.handleSumbit(type)}>
                            SAVE
                        </button>
                        <button className="cancel"
                            onClick={this.handleCancel}>
                            CANCEL
                        </button>
                        <button className="delete"
                            onClick={this.handleDelete}>
                            DELETE
                        </button>
                    </div>
                </div>
            </section>
          )}
    }

    render() {
        let {formType} = this.props;
        let profile = this.state;
        debugger
        return (
           <>
                {this.renderForm(profile, formType)}
           </>
        )
    }
}

export default ProfileForm;