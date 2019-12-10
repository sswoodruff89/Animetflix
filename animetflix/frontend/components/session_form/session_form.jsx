import React from "react";
import {Link} from "react-router-dom";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
    this.active = "";
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
    if (this.state.email === "") {
      this.handleBlur('email');
    } else if (this.state.password === "") {
      this.handleBlur('password');
    } else {
      this.props.processForm(this.state).then(() => {
        this.props.history.push("/browse");
      });
    }
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
        const captionEl = document.getElementById(`enter-${type}`);
        
        el.className = "";
        captionEl.className = "";
        inputEl.className = "active";
      }

    };
  }


  render() {
    
    const {formType, errors} = this.props;
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
    
    
    let errorMessage;
    if (errors.session) {
      errorMessage = (errors.session[0] === "Invalid email") ? (
        <section className="session-error">
          Sorry, we can't find an account with this email address. Please try again or <Link to="/signup" id="form-redirect"><u>create a new account.</u></Link>
        </section>
      ) : (errors.session[0] === "Invalid password") ? (
        <section className="session-error">
            <strong>Incorrect password.</strong> Please try again.
        </section>
      ) : ''
    }
  
///////RENDER RETURN////////

    return (
      <main className="session-form-background">
        <section className="session-form-container">
          <h2>{header}</h2>

          {errorMessage}

          <form className="session-form"
            onSubmit={this.handleSubmit}>
            <span className={`span-email ${this.active}`}>Email</span>
            <input type="text"
              // id="input-email"
              value={this.state.email}
              onChange={this.handleInput("email")}
              onFocus={(e)=> {
                this.active = "active";
              }}
              // onFocus={this.handleFocus("email")}
              // onBlur={this.handleBlur("email")}
               />
            <p id="enter-email" 
              className="hidden">Please enter a valid email</p>

            <span className="span-password">Password</span>
            <input type="password"
              id="input-password"
              value={this.state.password}
              onChange={this.handleInput("password")}
              // onFocus={this.handleFocus("password")}
              // onBlur={this.handleBlur("password")} 
              />
            <p id="enter-password"
              className="hidden">Your password must be at least 6 characters long</p>

            <button type="submit">{header}</button>


            
          </form>

          {redirector}

        </section>

      </main>
    );
  }
}

export default SessionForm;