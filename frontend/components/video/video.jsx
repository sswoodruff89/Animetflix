import React from "react";

class Video extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   version: this.props.version
    // };

  }


  render() {

    let {version, vidRef} = this.props;
    // let sourceVid = this.props.sourceVid || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
    let mute = (version === "thumbnail") ? true : false;
    let autoplay = (version.includes("detail") || version === "full") ? true : false;
    let controls = (version === "full") ? true: false;
    return (
      <>
        <video className={version}
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
          ref={vidRef}
           muted={mute}
           autoPlay={autoplay}
           controls={controls} />
      </>
    )
  }
}

export default Video;