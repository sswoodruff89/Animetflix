import React from "react";
import Video from "./video";
import { Link } from "react-router-dom";

class WatchPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      videoPresent: false,
      paused: false,
      volume: 50,
      lastVol: 50,
      vidLength: 0,
      currentTime: 0,
      timeLeft: 0,
      mouseDown: false,
      mouseMove: false,
      showControls: false
    };

    this.startRuntime = this.startRuntime.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleSecondSkip = this.handleSecondSkip.bind(this);
    this.showControls = this.showControls.bind(this);
    this.videoLoaded = this.videoLoaded.bind(this);
    this.handleProgressBar = this.handleProgressBar.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.requestProgram(this.props.match.params.programId);
    this.videoLoaded();
  }

  
  videoLoaded() {
    let vid = document.getElementById("video-player-full");
    if (!isNaN(vid.duration)) {
      let vidLength = vid.duration;
      let currentTime = vid.currentTime;
      this.setState({vidLength, currentTime, videoPresent: true});
      if (vid) {
        vid.play();
      }
    } else {
      setTimeout(() => {
        this.videoLoaded();
      }, 500);
    }
  }


  handlePlayPause(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player-full");
    let {paused, vidLength} = this.state;
  
    if (paused) {
      vid.play();
    } else {
      vid.pause();
    }

    this.setState({paused: !paused});
  }

  handleVolume(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player-full");
    this.setState({volume: e.target.value, lastVol: e.target.value});
    vid.volume = this.state.volume / 100;
  }

  handleMute(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player-full");
    let {volume, lastVol} = this.state;
    
    if (volume > 0) {
      vid.volume = 0;
      this.setState({ volume: 0 });
    } else {
      vid.volume = this.state.lastVol / 100;
      this.setState({ volume: lastVol });
    }
  }

  handleSecondSkip(dir) {
    return (e) => {
      e.preventDefault();
      let vid = document.getElementById("video-player-full");
      if (dir === "forward") {
        this.setState({currentTime: vid.currentTime += 10});

      } else {
        this.setState({ currentTime: vid.currentTime -= 10 });
      }
    };
  }

  startRuntime(vid) {
      this.setState({currentTime: vid.currentTime});
      vid.play();
  }

  handleProgressBar(vid) {
    return (e) => {
      e.preventDefault();

      if (e.currentTarget.value > vid.currentTime) {
        vid.currentTime = e.currentTarget.value;
        this.setState({ currentTime: e.currentTarget.value});
      }
    };
  }

  updateProgressBar(vid) {
    return (e) => {
      document.getElementById("progress").value = vid.currentTime;
      this.setState({currentTime: vid.currentTime});
    };
  }


  fullScreen(vid) {
    return (e) => {
      e.preventDefault();
      vid.requestFullScreen();
    };
  }

////REVEAL CONTROLS
  showControls(e) {
    
    this.setState({showControls: true});
    setTimeout(() => {
      this.setState({showControls: false});
    }, 4000);

  }
////////////////



////GET TIME LEFT
runtimeRemaining(duration, vid) {
  let time = Math.floor(duration) - Math.floor(vid.currentTime);
  
  let seconds = time % 60;
  let minutes = (Math.floor(time / 60));
  // let minutes = (Math.floor(time / 60) > 1) ? (Math.floor(time / 60)) : 0;
  let hours = (Math.floor(minutes / 60));
  seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;
  minutes = (minutes < 10 && minutes > 0) ? `0${minutes}` : `${minutes}`;

  return (hours > 0) ? `${hours}:${minutes}:${seconds}` : 
    (minutes > 0) ? `${minutes}:${seconds}`:
      `0:${ seconds }`;
}

/////////RENDER///////////////////

  render() {
    let {paused, volume, vidLength, currentTime, showControls} = this.state;
    
    let program = (this.props.program) ? this.props.program : {};
    let vid = document.getElementById("video-player-full");
    let pausePlay = (paused) ? (
          <button className="play"
          onClick={this.handlePlayPause} >
            &#9654;
          </button>
        ) : (
          <button className="pause"
          onClick={this.handlePlayPause}>
            &#10073;&#10073;
          </button>
        )
    
    let control = (showControls) ? "" : "hidden";
    
 ///////VOLUME       
    let volumeButton = (volume === 0) ? (
        <img className="mute" src={window.mute} alt="mute" onClick={this.handleMute}/>
      ) : (
        <img className="volume" src={window.volume} alt="volume" onClick={this.handleMute} /> 
      )

    let volumeColorMeter = {
      width: `${(volume / 100) * 180}px`
    }
///////

///////VIDEO

    let sourceVid = program.clip || "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"; 


////////CONTROLS
    let vidControls = (
      <section className="video-controls" >

        <div className="progress">
          <div className="progress-slide-container">

            <input
             type="range"
              id="progress"
              min="0"
              max={vidLength}
              value={currentTime}
              onChange={this.handleProgressBar(vid)}
              className="video-progress" />

            <progress className="progress-meter" min="0" 
              value={this.state.currentTime} max={vidLength}></progress>

            {/* <div className="bar">
            <div className="video-progress-meter"
              style={videoColorMeter}>
            </div>
                <div className="thumber" draggable={true}>

                </div>

            </div> */}


          </div>
          <span className="minutes-left">
              {(vid !== null) ? this.runtimeRemaining(vidLength, vid) : ""}
          </span>

        </div>

        <section className="left-controls">
          <div className="left-buttons">
          {pausePlay}

          <img className="back-ten" src={window.backTen}
            onClick={this.handleSecondSkip("back")}
            alt="skipten" />
          <img className="forward-ten" src={window.forwardTen}
            onClick={this.handleSecondSkip("forward")}
            alt="skipten" />

          <section className="volume-with-button">

            {volumeButton}

            <div className="volume-slider-container">
              <input type="range"
                min="0"
                max="100"
                value={volume}
                onChange={this.handleVolume}
                className="v-slider" />

              <div className="volume-color-meter"
                style={volumeColorMeter}>
              </div>

              <div className="volume-meter-back"></div>
            </div>
          </section>
          </div>
        <div className="now-playing">
            {program.title}
        </div>

        </section>

{/* AUDIO AND FULLSCREEN BUTTONS
        <section className="right-controls">

            <button className="questions">
             <i className="far fa-question-circle"></i>
            </button>

            <button className="questions">
              <i className="far fa-closed-captioning"></i>
            </button>

            <button className="fullscreen-button" 
            onClick={this.fullScreen(vid)}
            >
              <i className="fas fa-expand"></i>
            </button>

        </section> */}

      </section> 
    );


////////////////////////
////////////////////////

    return (
      <main className="fullscreen" 
        onMouseMove={this.showControls}
        >

      <section className={`all-controls ${control}`}>
        <div className="browser-link"> 
          <Link to="/browse">
            <button className="back-to-last-address">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Browse</span>
            </button>
          </Link>

        </div>

        {vidControls}
      </section>

        {/* <section className="current-program-details" >


        </section> */}

        {/* <section className="video-container"> */}
          {/* <Video version="full" sourceVid={program.clip}/> */}

          {/* <Video version="full" /> */}

        <video className="full"
          // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          src={sourceVid}
          id="video-player-full"
          // muted={mute} 
          autoPlay={true} 
          onTimeUpdate={this.updateProgressBar(vid)} 
          />

        {/* </section> */}

      </main>
    )
  }
}

export default WatchPage;