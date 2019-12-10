import React from "react";
import {Link} from "react-router-dom";

class HomePage extends React.Component {
  
  componentDidMount() {
    const body = document.getElementById("main-body");
    
    body.className = "homepage-background";
  }

  componentWillUnmount() {
    const body = document.getElementById("main-body");
    body.className = "";
  }
  
  render() {
    return (
      <section className="homepage">

        {/* <Link to="/login"><button type="submit">Sign In</button></Link> */}

        <div className="welcome">
          <h1>All of Animetflix</h1>
          <h1>Right on your browser!</h1>
        </div>

        <Link to="/signup">
          <button className="free">Sign up for a Free Trial</button>
        </Link>

        <button className="demo">Demo</button>


      </section>

    );
  }

}

export default HomePage;