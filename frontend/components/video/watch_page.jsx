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
      showControls: false
    };

    // this.previousPage = this.previousPage.bind(this);
    this.startRuntime = this.startRuntime.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleSecondSkip = this.handleSecondSkip.bind(this);
    // this.showControls = this.showControls.bind(this);
    this.videoLoaded = this.videoLoaded.bind(this);
    this.handleProgressBar = this.handleProgressBar.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidMount() {
    this.props.requestMovie(this.props.match.params.movieId);
    this.videoLoaded();
  }

  
  videoLoaded() {
    let vid = document.getElementById("video-player");

    if (!isNaN(vid.duration)) {
      let vidLength = vid.duration;
      let currentTime = vid.currentTime;
      this.setState({vidLength, currentTime, videoPresent: true});
    } else {
      setTimeout(() => {
        this.videoLoaded();
      }, 500);
    }
  }
  // previousPage(e) {
  //   e.preventDefault();
  //   this.props.history.push(this.props.previousPage);
  // }

  handlePlayPause(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player");
    let {paused, vidLength} = this.state;
  
    if (paused) {
      vid.play();
      this.runtime = setInterval(() => {
        this.startRuntime(vid);
      }, 500);
    } else {
      clearInterval(this.runtime);
      vid.pause();
    }

    this.setState({paused: !paused});
    
  }

  handleVolume(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player");
    this.setState({volume: e.target.value, lastVol: e.target.value});
    vid.volume = this.state.volume / 100;

  }

  handleMute(e) {
    e.preventDefault();
    let vid = document.getElementById("video-player");
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
      let vid = document.getElementById("video-player");
      if (dir === "forward") {
        this.setState({currentTime: vid.currentTime += 10});

      } else {
        this.setState({ currentTime: vid.currentTime -= 10 });
      }
    };
  }

  startRuntime(vid) {
    if (!this.state.paused) {
      this.setState({currentTime: vid.currentTime});
    }
  }

  handleProgressBar(vid) {
    return (e) => {
      e.preventDefault();
      // if (Math.floor(vid.currentTime) !== Math.floor(e.target.value)) {
        vid.currentTime = e.target.value;
        this.setState({currentTime: vid.currentTime});
      // }
    };
  }

  fullScreen(vid) {
    return (e) => {
      e.preventDefault();
      vid.requestFullScreen();
    };
  }

////REVEAL CONTROLS
  // showControls(e) {

  //   this.setState({showControls: true});
  //   setTimeout(() => {
  //     this.setState({showControls: false});
  //   }, 6000);

  // }
////////////////

////GET TIME LEFT
runtimeRemaining(duration, vid) {
  let time = Math.floor(duration) - Math.floor(vid.currentTime);
  
  let seconds = time % 60;
  let minutes = (Math.floor(time / 60) > 1) ? (Math.floor(time / 60)) : 0;
  let hours = (minutes > 60) ? (Math.floor(minutes / 60)) : 0;
  seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;
  minutes = (minutes < 10 && minutes > 0) ? `0${minutes}` : `${minutes}`;

  return (hours > 0) ? `${hours}:${minutes}:${seconds}` : 
    (minutes > 0) ? `${minutes}:${seconds}`:
      `0:${ seconds }`;
}
///

  render() {
    // let movie = (this.props.movie) ? this.props.movie: {};

    let {paused, volume, vidLength, currentTime, showControls} = this.state;
    let vid = document.getElementById("video-player");
    let pausePlay = (paused) ? (
          <button className="play"
          onClick={this.handlePlayPause} >
            &#9654;
          </button>
        ) : (
          <button className="pause"
          onClick={this.handlePlayPause}>
            &#9612;&#9612;
          </button>
        )
    
    
//////PROGRESS BAR
    let runtimeRatio = (currentTime / vidLength).toFixed(2)
    let videoColorMeter = {
      width: `${runtimeRatio * 100}%`
    }
 ///////VOLUME       
    let volumeButton = (volume === 0) ? (
      <i className="fas fa-volume-mute" onClick={this.handleMute}></i>
      ) : (
        <i className="fas fa-volume-up"
          onClick={this.handleMute}></i> 
      )

    let volumeColorMeter = {
      width: `${(volume / 100) * 180}px`
    }
///////

////////CONTROLS
    let vidControls = (!showControls) ? (
      <section className="video-controls" >

        <div className="progress">
          <div className="progress-slide-container">
            <input
            type="range"
              min="0"
              max="100"
              value={runtimeRatio * 100}
              // onChange={this.handleProgressBar(vid)}
              className="video-progress" />

            <div className="volume-color-meter"
              style={videoColorMeter}>
            </div>
          </div>
          <span className="minutes-left">
              {(vid !== null) ? this.runtimeRemaining(vidLength, vid) : ""}
          </span>

        </div>

        <section className="left-controls">
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
            </div>
          </section>


        </section>

        <section className="right-controls">
            <button className="fullscreen-button"
              onClick={this.fullScreen(vid)}>
              <i className="fas fa-expand"></i>
            </button>

        </section>

      </section> 
    ) : "";
////////

    return (
      <main className="fullscreen"
        // onMouseMove={this.showControls}
        >
        <Link to="/browse">
          <button className="back-to-last-address">
            Back to Browse
          </button>
        </Link>

        {vidControls}
       

        {/* <section className="current-movie-details" >


        </section> */}

        {/* <section className="video-container"> */}
          {/* <Video version="full" sourceVid={movie.clip}/> */}
          <Video version="full" />

        {/* </section> */}

      </main>
    )
  }
}

export default WatchPage;