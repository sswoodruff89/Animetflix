import React from "react";

const Video = ({version, sourceVid}) => {

    sourceVid = (!sourceVid) ? "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" : sourceVid 
    let mute = (version === "full") ? false : true;
    let autoplay = (version.includes("detail") || version === "full" || version == "showcase") ? true : false;

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

export default Video;