import React from "react";

class Video extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    let {version} = this.props;
    let sourceVid = this.props.sourceVid || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
    let mute = (version === "full") ? false : true;
    let autoplay = (version.includes("detail") || version === "full" || version == "showcase") ? true : false;
    // let controls = (version === "full") ? true: false;
    return (
      <>
        <video className={version}
          src={sourceVid}
          id={`video-player-${(version.includes("detail")) ? "detail" : version}`}
           muted={mute}
           autoPlay={autoplay} />
      </>
    )
  }
}

export default Video;