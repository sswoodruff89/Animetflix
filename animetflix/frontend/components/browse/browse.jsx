import React from "react";
// import {logout} from "../actions/session_actions";


class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  render() {
    return (
      <main className="browse-background">

      </main>
    );
  };
  
};

export default Browse;