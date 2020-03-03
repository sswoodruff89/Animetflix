import React from "react";
import {Link} from "react-router-dom";
import {login} from "../actions/session_actions";
import {connect} from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.loginDemo = this.loginDemo.bind(this);
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  loginDemo(e) {
    e.preventDefault();
    let demo = {email: "demo@demo.com", password: "anything"};
    this.props.login(demo);
  }

  render() {
    return (
      <main className="homepage-background">
        <section className="homepage">
          <div className="welcome">
            <h1>All of Animetflix</h1>
            <h1>Right on your browser!</h1>
          </div>

          <Link to="/signup">
            <button className="free">Sign up for a Free Trial</button>
          </Link>

          <button className="demo" onClick={this.loginDemo}>
            Demo
          </button>
        </section>
      </main>
    );
  }
}

const mdp = dispatch => {
  return {
    login: user => {
      return dispatch(login(user));
    }
  };
};

export default connect(null, mdp)(HomePage);