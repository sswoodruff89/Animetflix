import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput(type){
    return (e) => {
      this.setState({[type]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
  }

  render() {
    const {formType} = this.props;
    const header = (formType === 'login') ? "Sign In" : "Sign Up";

    return (
      <section className={formType}>
        <h2>{header}</h2>
        <form>


        </form>

      </section>
    );
  }
}

export default SessionForm;