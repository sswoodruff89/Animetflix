import React from "react";
import Video from "../../video/video";
import {Link} from "react-router-dom";


// class ProgramDetail extends React.Component {
class ProgramDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab: "overview",
      currentId: this.props.program ? this.props.program.id : "",
      video: false,
      changing: false,
      watched: this.props.watched ? true : false,
      closing: false,
      liked: this.props.liked ? true : false,
      disliked: this.props.disliked ? true : false,
      muted: true
    };

    this.handleTab = this.handleTab.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.renderOverview = this.renderOverview.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderEpisodes = this.renderEpisodes.bind(this);
    this.currentTabPage = this.currentTabPage.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.renderLikeButtons = this.renderLikeButtons.bind(this);

    // this.tabObject = {
    //   'overview': (program, genres, fadeIn) => {
    //     return this.renderOverview(program, genres, fadeIn);
    //   },
    //   'details': (program, genres, fadeIn) => {
    //     return this.renderDetails(program, genres, fadeIn);
    //   },
    //   'episodes': (program, genres, fadeIn) => {
    //     return this.renderEpisodes(program, genres, fadeIn);
    //   }
    // };
  }

  componentDidMount() {
    this.props.requestProgram(parseInt(this.props.match.params.programId));
    
    
    setTimeout(() => {
      this.setState({ video: true });
      let vid = document.getElementById("video-player-detail");
      vid.onended = () => {
        this.setState({ video: false });
      }
    }, 1800);
  }

  componentDidUpdate() {
    ///For toggling between programs while Details is open

    let programId = parseInt(this.props.match.params.programId);
    if (
      this.state.currentId && 
      programId !== this.state.currentId &&
      !this.props.program.description
      ) {

      this.props.requestProgram(this.props.match.params.programId);
      this.setState({ currentId: programId });
    }
  }

  handleTab(type) {
    return e => {
      e.preventDefault();
      let { tab, video } = this.state;

      ///Pause or play video
      if (video) {
        let vid = document.getElementById("video-player-detail");
        type === "overview" ? vid.play() : vid.pause();
      }

      if (tab !== type) {
        this.setState({tab: type, changing: true});

        setTimeout(() => {
          this.setState({changing: false});
        }, 50);
      }
    };
  }

  handleWatchList(e) {
    e.preventDefault();
    let watchStatus = this.state.watched;

    if (watchStatus) {
      this.props.removeFromWatchList(this.props.watched.id);
    } else {
      this.props.addToWatchList(this.props.program.id);
    }
    this.setState({ watched: !watchStatus });
  }

  handleLike(e) {
    e.preventDefault();
    let likeStatus = this.state.liked;

    if (likeStatus) {
      this.props.removeFromLikes(this.props.liked.id).then(() => {
        this.setState({ liked: !likeStatus });
      });
    } else {
      this.props.addLike(this.props.program.id).then(() => {
        this.setState({ liked: !likeStatus });
      });
    }
  }

  handleDislike(e) {
    e.preventDefault();
    let dislikeStatus = this.state.disliked;

    if (dislikeStatus) {
      this.props.removeFromDislikes(this.props.disliked.id).then(
        () => {
          this.setState({ disliked: !dislikeStatus });
        }
      );
    } else {
      this.props.addDislike(this.props.program.id).then(() => {
        this.setState({ disliked: !dislikeStatus });
      });
    }
  }


  handleMute(e) {
    e.preventDefault();

    let vid = document.getElementById("video-player-detail");
    let muted;

    if (!this.state.muted) {
      muted = true;
    } else {
      muted = false;
      vid.volume = 0.2;
    }
    vid.muted = muted;
    this.setState({ muted });
  }


  closeDetails(e) {
    e.preventDefault();
    this.setState({ closing: true, video: false });

    if (this.props.displayType === "search") {
      setTimeout(() => {
        let queryAddress = this.props.history.location.pathname.split("/");
        this.props.history.push(
          `/search/${queryAddress[queryAddress.length - 2]}`
        );
      }, 600);
    } else {
      setTimeout(() => {
        this.props.history.push(
          `/${this.props.history.location.pathname.split("/")[1]}`
        );
        // this.props.history.goBack();
      }, 600);
    }
  }

  renderLikeButtons() {
    let likeActive = this.state.liked ? "active" : "inactive";
    let dislikeActive = this.state.disliked ? "active" : "inactive";

    
    if (!this.state.liked && !this.state.disliked) {
      return (
        <div className="details-like-container">
          <button className="details-like-dislike" onClick={this.handleLike}>
            <img className="like" src={window.like} alt="like" />
          </button>

          <button className="details-like-dislike" onClick={this.handleDislike}>
            <img className="dislike" src={window.dislike} alt="dislike" />
          </button>
        </div>
      );
    } else if (this.state.liked || this.state.disliked) {
      return (
        <div className="details-like-container">
          <button
            className={`details-like-dislike ${likeActive}`}
            onClick={this.handleLike}
          >
            <img className="like" src={window.like} alt="like" />
          </button>

          <button
            className={`details-like-dislike ${dislikeActive}`}
            onClick={this.handleDislike}
          >
            <img className="dislike" src={window.dislike} alt="dislike" />
          </button>
        </div>
      );
    }
  }

  renderOverview(program, genres, fadeIn) {
    let score = {
      width: `${(program.score / 5) * 100}%`
    };

    let runtimeSeason = program.runtime
      ? program.runtime
      : program.seasons > 1
      ? `${program.seasons} seasons`
      : `${program.seasons} season`;

    let watchStatus = this.state.watched ? (
      <i className="fas fa-check"></i>
    ) : (
      <i className="fas fa-plus"></i>
    );

    let likeButtons = this.renderLikeButtons();


    let muteButton = (this.state.muted) ? (
      <img className="details-mute" src={window.muteCir} alt="mute" onClick={this.handleMute} />
    ) : (
        <img className="details-volume" src={window.volumeCir} alt="volume" onClick={this.handleMute} />
    )

    return (
      <section className="detail-content-container" style={fadeIn}>
        <aside className="rating-runtime">
          <div className="score">
            <span className="stars" style={score}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
          </div>

          <span>{program.yr}</span>
          <span className="rating">{program.rating}</span>
          <span>{runtimeSeason}</span>
        </aside>

        <aside className="description">{program.description}</aside>

        <div className="detail-buttons">
          <button className="detail-play">
            <Link to={`/watch/${program.id}`}>
              <span>&#9654;</span>
              PLAY
            </Link>
          </button>
          <button className="detail-watchlist" onClick={this.handleWatchList}>
            {watchStatus}
            {" "}MY LIST
          </button>
          {likeButtons}
        </div>
        {muteButton}
        <span className="genre-cap">Genres: {genres}</span>
      </section>
    );
  }

  renderDetails(program, genres, fadeIn) {
    return (
      <section className="detail-content-container" style={fadeIn}>
        <div className="director">Directed by: {program.director}</div>

        <div className="production-company">
          Production Company: {program.production_company}
        </div>

        <aside className="description">{program.description}</aside>

        <span className="genre-cap">Genres: {genres}</span>
      </section>
    );
  }

  renderEpisodes(program, fadeIn) {
    return (
      <section className="detail-content-container" style={fadeIn}>
        <div className="director">Directed by: {program.director}</div>

        <div className="production-company">
          Production Company: {program.production_company}
        </div>

        <aside className="description">{program.description}</aside>
      </section>
    );
  }

  currentTabPage(tab, program, genre) {
    let fadeIn = !this.state.changing
      ? {
          opacity: "1",
          transition: `opacity 100ms ease`
        }
      : {};
    ///fade in between renders
    switch (tab) {
      case "overview":
        return this.renderOverview(program, genre, fadeIn);
      case "details":
        return this.renderDetails(program, genre, fadeIn);
      // case "episodes":
      //   return this.renderEpisodes(program, fadeIn);
      default:
        return "";
    }
  }

  render() {
    let program = this.props.program || {};

    let genres = this.props.genres ? this.props.genres.join(", ") : "";
    let { tab, closing, video } = this.state;
    let paused = tab !== "overview" ? "paused" : "";
    let closer = closing ? "closing" : "";

    let videoRender = video ? (
      <Video version={`detail ${paused}`} sourceVid={program.clip} />
    ) : (
      ""
    );
    let detailBackImage = {
      backgroundImage: `url("${program.background}")`
    };

    let episodes =
      program.program_type === "TV Show" ? (
        <li
          key="3"
          className={tab === "episodes" ? "current-tab" : ""}
          onClick={this.handleTab("episodes")}
        >
          EPISODES
          <span className={tab === "episodes" ? "current-tab" : ""}></span>
        </li>
      ) : (
        ""
      );

    return (
      <section
        id={(this.props.displayType === "showcase") ? "showcase" : ""}
        className={`program-detail-page ${closer}`}
        style={detailBackImage}
      >
        {videoRender}

        <section className="inner-detail-container">
          <button className={`detail-closer `} onClick={this.closeDetails}>
            &#10060;
          </button>

          <header className="detail-logo-header">
            <div className={`logo-container ${tab}`}>
              <img
                className={`program-logo ${tab}`}
                src={program.logo}
                alt=""
              />
            </div>
          </header>

          {this.currentTabPage(tab, program, genres)}
        </section>

        <ul className="detail-tabs">
          <li
            key="1"
            className={tab === "overview" ? "current-tab" : ""}
            onClick={this.handleTab("overview")}
          >
            OVERVIEW
            <span className={tab === "overview" ? "current-tab" : ""}></span>
          </li>
          <li
            key="2"
            className={tab === "details" ? "current-tab" : ""}
            onClick={this.handleTab("details")}
          >
            DETAILS
            <span className={tab === "details" ? "current-tab" : ""}></span>
          </li>

          {episodes}
        </ul>
      </section>
    );
  }
}

export default ProgramDetail;