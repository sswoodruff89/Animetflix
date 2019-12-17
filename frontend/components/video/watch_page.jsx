import React from "react";
import Video from "./video";

class WatchPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      play: true
    };

    this.previousPage = this.previousPage.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
  }

  componentDidMount() {
    this.props.requestMovie(this.props.match.params.movieId);
  }

  previousPage(e) {
    e.preventDefault();
    this.props.history.push(this.props.previousPage);
  }

  handlePlayPause(e) {
    e.preventDefault();
    let play = this.state.play;
    this.setState({play: !play});
  }

  render() {
    // let movie = (this.props.movie) ? this.props.movie: {};

    let pausePlay = (this.state.play) ? (
          <button className="play"
          onClick={this.handlePlayPause} >
            &#9654;
          </button>
        ) : (
          <button className="pause "
          onClick={this.handlePlayPause}>
            &#9612;&#9612;
          </button>
        )

    return (
      <main className="fullscreen">
        <button className="back-to-last-address">
          
          Back to Browse
        </button>

        <section className="video-controls" >
          {pausePlay}


        </section>
        <section className="video-container">
          {/* <Video version="full" sourceVid={movie.clip}/> */}
          <Video version="full" />

        </section>

      </main>
    )
  }
}

export default WatchPage;