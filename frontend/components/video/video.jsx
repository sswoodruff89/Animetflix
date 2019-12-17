import React from "react";

class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: this.props.version
    };

  }


  render() {
    debugger
    return (
      <>
        <video className={this.state.version}
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
          muted />
      </>
    )
  }
}

export default Video;