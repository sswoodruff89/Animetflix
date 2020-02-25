import React from "react";

const COLORS = {
  0: "red",
  1: "blue",
  2: "white",
  3: "green",
  4: "purple",
  5: "yellow"
};

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.profileId !== undefined) {
            this.props.requestProfile(this.props.profileId);
        }
    }

    handleInput(e) {
        
        let profile = this.state.profile;
        profile.name = e.target.value;
        this.setState({profile, nameActive: ""});
    }

    handleBlur(e) {
        
        let name = this.state.profile.name;
        if (name === "") {
            this.setState({nameActive: "active"});
        }
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.closeModal();
    }

    handleSubmit(formType) {
    
        return (e) => {
            e.preventDefault();
            let profile = this.state.profile;
            if (profile.name === "") {
                this.handleBlur(e);
            } else if (formType === "new") {
              profile.profile_num = this.props.newNum;
              
                this.props.createProfile(profile).then(() => {
                    this.props.closeModal();

                    this.props.history.push("/profiles");
                });
            } else {
                this.props.updateProfile(profile).then(() => {
                    this.props.closeModal();
                    this.props.history.push("/profiles");
                })
            }
        }
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteProfile(this.props.profile.id).then(() => {
            this.props.closeModal();
            this.props.history.push("/profiles");
        })
    }

    renderForm(profile, type, icon, profileCount) {
        
        if (type === "new") {
            return (
              <>
                <div className="form-heading">
                  <h2>Add Profile</h2>
                  <span>
                    Add a profile for another person to watch Animetflix
                  </span>
                </div>

                <div className="form-container">
                  <div
                    className="profile-icon"
                    style={{
                      backgroundImage: `url(${window.miniLogos[this.props.newNum - 1]})`,
                      backgroundColor: `${COLORS[this.props.newNum - 1]}`
                    }}
                  >
                    <div className="profile-edit">
                      <span></span>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={profile.name}
                    placeholder="Name"
                    className={`prof-name-input ${this.state.nameActive}`}
                    autoFocus
                    onBlur={this.handleBlur}
                    onChange={this.handleInput}
                  />
                  <p className={`prof ${this.state.nameActive}`}>
                    Please enter a name
                  </p>
                  <div className="prof-form-buttons">
                    <button
                      className="add-profile"
                      onClick={this.handleSubmit(type)}
                    >
                      CONTINUE
                    </button>
                    <button
                      className="cancel"
                      onClick={() => this.props.closeModal()}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </>
            );
        } else {
          return (
            <>
              <div className="form-heading">
                <h2>Edit Profile</h2>
              </div>

              <div className="form-container">
                <div
                  className="profile-icon"
                  style={{
                    backgroundImage: `url(${
                      window.miniLogos[this.props.icon]
                    })`,
                    backgroundColor: `${COLORS[this.props.icon]}`
                  }}
                >
                  <div className="profile-edit">
                    <span></span>
                  </div>
                </div>

                <input
                  type="text"
                  value={this.props.profile.name}
                  placeholder="Name"
                  className={`prof-name-input ${this.state.nameActive}`}
                  onBlur={this.handleBlur}
                  onChange={this.handleInput}
                />
                <p className={`prof ${this.state.nameActive}`}>
                  Please enter a name
                </p>

                <div className="prof-form-buttons">
                  <button
                    className="save-profile"
                    onClick={this.handleSubmit(type)}
                  >
                    SAVE
                  </button>
                  <button
                    className="cancel"
                    onClick={() => this.props.closeModal()}
                  >
                    CANCEL
                  </button>
                  {(profileCount > 1) ? (
                    <button className="delete" onClick={this.handleDelete}>
                      DELETE
                    </button>
                    ) : ""
                  }
                </div>
              </div>
            </>
          );}
    }

    render() {
        let {formType, icon, profileCount} = this.props;
        let profile = this.state;
        return (
           <>
                {this.renderForm(profile, formType, icon, profileCount)}
           </>
        )
    }
}

export default ProfileForm;