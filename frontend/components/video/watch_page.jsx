import React from "react";
import Video from "./video";

class WatchPage extends React.Component{
  constructor(props) {
    super(props);

    this.previousPage = this.previousPage.bind(this);
  }

  previousPage(e) {
    e.preventDefault();
    this.props.history.push(this.props.previousPage);
  }

  render() {
    <main className="fullscreen">
      <button className="back-to-last-address">Back to Browse</button>
      <Video version="full-video" />

    </main>
  }
}