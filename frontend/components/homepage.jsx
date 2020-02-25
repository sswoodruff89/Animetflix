import React from "react";
import {Link} from "react-router-dom";
import {login} from "../actions/session_actions";

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
    let demo = { email: "demo@demo.com", password: "anything" };
    this.props.login(demo);
  }

  render() {
    return (
      <main className="homepage-background">
        <section className="homepage">
          {/* <Link to="/login"><button type="submit">Sign In</button></Link> */}

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

export default HomePage;