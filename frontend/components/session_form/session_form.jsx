import React from "react";
import {Link} from "react-router-dom";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      emailActive: "",
      passwordActive: "",
      emailCaption: "",
      passwordCaption: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInput(type){
    return (e) => {
      let user = this.state.user;
      user[type] =  e.target.value;
      this.setState({ user });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let {email, password} = this.state.user;
    if (email === "") {
      this.handleBlur('email');
    } else if (password === "") {
      this.handleBlur('password');
    } else {
      this.props.processForm(this.state.user).then(() => {
        // this.props.history.push("/browse");
        this.props.history.push("/profiles");
      });
    }
  }



  handleFocus(type) {
    return (e) => {
      e.preventDefault();
      this.setState({[`${type}Active`]: "active"});
    };
  }

  handleBlur(type) {
    return (e) => {
      e.preventDefault();
      let input = this.state.user[type];
      if (input === "") {
        this.setState({ 
          [`${type}Active`]: "",
          [`${type}Caption`]: "active",
         });
      }

    };
  }


  render() {
    
    const {formType, errors} = this.props;

    const {emailActive, passwordActive, emailCaption, passwordCaption} = this.state;
    //toggle for transitions

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
      ) : (errors.session[0] === "Invalid email / password") ? (
        <section className="session-error">
              Please enter a valid email address and password.
        </section>
      ) : ''
    }
  
///////RENDER RETURN////////

    return (
      <main className="session-form-background">
        <section className="session-form-container">
          <h2>{header}</h2>


          <form className="session-form"
            onSubmit={this.handleSubmit}>
            
            {errorMessage}
              
            <span id="email" 
              className={emailActive}>
                  Email
            </span>

            
            <input type="text"
              // id="input-email"
              value={this.state.user.email}
              className={emailCaption}
              onChange={this.handleInput("email")}
              onFocus={this.handleFocus("email")}
              onBlur={this.handleBlur("email")}
               />
            <p className={emailCaption}>Please enter a valid email</p>

            <span id="password" 
              className={passwordActive}>
                  Password
            </span>

            <input type="password"
              className={passwordCaption}
              value={this.state.user.password}
              onChange={this.handleInput("password")}
              onFocus={this.handleFocus("password")}
              onBlur={this.handleBlur("password")} 
              />
            <p className={passwordCaption} >Your password must be at least 6 characters long</p>

            <button type="submit">{header}</button>

          </form>

          {redirector}

        </section>

      </main>
    );
  }
}

export default SessionForm;