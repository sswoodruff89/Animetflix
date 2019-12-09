import React from "react";
import {Link} from "react-router-dom";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInput(type){
    return (e) => {
      this.setState({[type]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(() => {
      this.props.history.push("/browse");
    });
  }

  handleFocus(type) {
    return (e) => {
      e.preventDefault();
      const el = document.getElementById(type);
      const inputEl = document.getElementById(`input-${type}`);
      inputEl.className = "active";
      el.className = "active";
    };
  }

  handleBlur(type) {
    return (e) => {
      e.preventDefault();
      if (this.state[type] === "") {
        const el = document.getElementById(type);
        const inputEl = document.getElementById(`input-${type}`);
        inputEl.className = "active";
        el.className = "";
      }

    };
  }


  render() {
    
    const {formType} = this.props;
    const header = (formType === 'login') ? "Sign In" : "Sign Up";

    const redirector = (formType === 'login') ? (
        <section className="redirect">
          New to Animetflix? <Link to="/signup" id="form-redirect">Sign up now!</Link>
      </section>
    ) : (
        <section className="redirect">
          Have an account? <Link to="/login" id="form-redirect">Sign in!</Link>
        </section>
    );
  

    return (
      <section className="session-form-container">
        <h2>{header}</h2>
        <form className="session-form"
          onSubmit={this.handleSubmit}>
          
          <span id="email">Email</span>
          <input type="text"
            id="input-email"
            value={this.state.email}
            onChange={this.handleInput("email")}
            onFocus={this.handleFocus("email")}
            onBlur={this.handleBlur("email")} />

          <span id="password">Password</span>
          <input type="password"
            id="input-password"
            value={this.state.password}
            onChange={this.handleInput("password")}
            onFocus={this.handleFocus("password")}
            onBlur={this.handleBlur("password")} />

          <button type="submit">{header}</button>
        </form>

        {redirector}

      </section>
    );
  }
}

export default SessionForm;