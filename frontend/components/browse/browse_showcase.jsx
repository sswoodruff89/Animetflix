import React from "react";
import Video from "../video/video";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import {Link, Route} from "react-router-dom";

class Showcase extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            watched: this.props.watched,
            muted: true,
            showcaseLoaded: false
        };
        this.renderHomeDetails = this.renderHomeDetails.bind(this);
        this.handleWatchList = this.handleWatchList.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.playShowcase = this.playShowcase.bind(this);
        this.pauseShowcase = this.pauseShowcase.bind(this);
    }

    componentDidMount() {
        this.props.requestProgram(this.props.showcaseProgram.id);
        setTimeout(() => {
            this.setState({showcaseLoaded: true})
        }, 2000);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate() {
        let vid = document.getElementById("video-player-showcase");

        if (vid) {
            if (this.props.history.location.pathname.endsWith("browse")) {
                this.playShowcase();
            } else {
                this.pauseShowcase();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll(e) {
        if (window.scrollY > 250) {
            this.pauseShowcase();
        } else {
            this.playShowcase();
        }
    }

    handleWatchList(e) {
        e.preventDefault();
        let watchStatus = this.state.watched;

        if (watchStatus) {
            this.props.removeFromWatchList(this.props.showcaseProgram.id);
        } else {
            this.props.addToWatchList(this.props.showcaseProgram.id);
        }
        this.setState({watched: !watchStatus});
    }

    handleMute(e) {
        e.preventDefault();

        let vid = document.getElementById("video-player-showcase");
        let muted;

        if (!this.state.muted) {
            muted = true;
        } else {
            muted = false;
            vid.volume = 0.2;
        }
        vid.muted = muted;
        this.setState({muted});
    }

    playShowcase() {
        let vid = document.getElementById("video-player-showcase");
        if (vid) {
            vid.play();
        }
    }

    pauseShowcase() {
        let vid = document.getElementById("video-player-showcase");
        if (vid) {
            vid.pause();
        }
    }

    renderHomeDetails(program) {
        if (program) {
            clearTimeout(this.showcaseDisplay);
 
            let sourceVid = program.clip || null;

            let watchStatus = (this.state.watched) ? (
                <span className="button-icon">
                    <i className="fas fa-check"></i>
                </span>
            ) : (
                <span className="button-icon">
                    <i className="fas fa-plus"></i>
                </span>
            )

            let muteButton = (this.state.muted) ? (
                <img className="showcase-mute" src={window.muteCir} alt="mute" onClick={this.handleMute} />
            ) : (
                <img className="showcase-volume" src={window.volumeCir} alt="volume" onClick={this.handleMute} />
            )

            return (
              <>
                <div className="vid-container">
                  <Video version="showcase" sourceVid={sourceVid} />
                </div>
                <section className="showcase-container">
                  <div
                    className={`logo-and-buttons ${this.state.showcaseLoaded}`}
                  >
                    <div className={`showcase-logo-container`}>
                      <img
                        className={`program-logo`}
                        src={program.logo}
                        alt="logo"
                      />
                    </div>

                    <div className="showcase-detail-buttons">
                      <button className="showcase-play">
                        <Link to={`/watch/${program.id}`}>
                          <span className="button-icon">&#9654;</span>
                          <span>Play</span>
                        </Link>
                      </button>

                      <button
                        className="showcase-watchlist"
                        onClick={this.handleWatchList}
                      >
                        {watchStatus}
                        <span>My List</span>
                      </button>

                      <button className="showcase-more-info">
                        <Link to={`/browse/showcase/${program.id}`}>
                          <span className="button-icon">&#x24D8;</span>
                          <span>More Info</span>
                        </Link>
                      </button>
                    </div>
                  </div>
                </section>
                <div
                  className={`showcase-mute-rating ${this.state.showcaseLoaded}`}
                >
                  {muteButton}
                  <div className="showcase-rating">{program.rating}</div>
                </div>
              </>
            );
        } else {
            this.showcaseDisplay = setTimeout(() => {
                this.renderHomeDetails(program)
            }, 5000);
        }
    }



    render() {
        let {showcaseProgram} = this.props;
        
        let showcase = (this.props.history.location.pathname.includes("showcase")) ?
            (<Route path="/browse/showcase/:programId" 
                render={() => <ProgramDetailContainer displayType="showcase" programId={showcaseProgram.id} />}
            />)
            : this.renderHomeDetails(showcaseProgram);

        return (
            <>
                {showcase}
            </>
        )

    }
}

export default Showcase;