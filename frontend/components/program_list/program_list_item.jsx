import React from "react";
import { Link } from "react-router-dom";
import Video from "../video/video";

class ProgramListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.watched ? true : false,
      liked: this.props.liked ? true : false,
      disliked: this.props.disliked ? true : false
    };

    this.detailsLink = this.detailsLink.bind(this);
    this.pauseThumbnail = this.pauseThumbnail.bind(this);
    this.playThumbnail = this.playThumbnail.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.renderLikeButtons = this.renderLikeButtons.bind(this);
    // this.redirectFullPlay = this.redirectFullPlay.bind(this);
  }

  detailsLink(displayType) {
    const program = this.props.program ? this.props.program : {};

    if (displayType === "browse") {
      return (
        <Link to={`/browse/list_${this.props.listName}/${program.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "search") {
      return (
        <Link
          to={`/search/${this.props.match.params.searchQuery}/${this.props.listNum}/${program.id}`}
        >
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "watchlist") {
      return (
        <Link to={`/watchlist/${this.props.listNum}/${program.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "tv") {
      return (
        <Link to={`/tv/${this.props.listNum}/${program.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "movie") {
      return (
        <Link to={`/movie/${this.props.listNum}/${program.id}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    }
  }

  /////////HOVER VIDEO START/STOP
  playThumbnail(e) {
    let vid = e.currentTarget.previousSibling;
    vid.play();
  }

  pauseThumbnail(e) {
    let vid = e.currentTarget.previousSibling;
    vid.pause();
  }
  /////////

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
      this.props.removeFromDislikes(this.props.disliked.id).then(() => {
        this.setState({ disliked: !dislikeStatus });
      });
    } else {
      this.props.addDislike(this.props.program.id).then(() => {
        this.setState({ disliked: !dislikeStatus });
      });
    }
  }

  renderLikeButtons() {
    let likeActive = this.state.liked ? "active" : "inactive";
    let dislikeActive = this.state.disliked ? "active" : "inactive";

    if (!this.state.liked && !this.state.disliked) {
      return (
        <div className="like-container">
          <button className="like-dislike" onClick={this.handleLike}>
            <img className="like" src={window.like} alt="like" />
          </button>

          <button className="like-dislike" onClick={this.handleDislike}>
            <img className="dislike" src={window.dislike} alt="dislike" />
          </button>
        </div>
      );
    } else if (this.state.liked || this.state.disliked) {
      return (
        <div className="like-container">
          <button
            className={`like-dislike ${likeActive}`}
            onClick={this.handleLike}
          >
            <img className="like" src={window.like} alt="like" />
          </button>

          <button
            className={`like-dislike ${dislikeActive}`}
            onClick={this.handleDislike}
          >
            <img className="dislike" src={window.dislike} alt="dislike" />
          </button>
        </div>
      );
    }
  }

  render() {
    const program = this.props.program ? this.props.program : {};
    let genres = this.props.genres
      ? this.props.genres.slice(0, 3).map((genre, i) => {
          let bullet = i > 0 ? <span>•</span> : "";
          return (
            <div key={i}>
              {bullet}
              <li className={`genre${i}`} key={i}>
                {genre}
              </li>
            </div>
          );
        })
      : "";

    let likeButtons = this.renderLikeButtons();

    let watchStatus = this.state.watched ? (
      <button className="watchlist" onClick={this.handleWatchList}>
        <img className="added" src={window.check} alt="check" />
      </button>
    ) : (
      <button className="watchlist" onClick={this.handleWatchList}>
        <img className="add" src={window.add} alt="add" />
      </button>
    );

    let runtimeSeason = program.runtime
      ? program.runtime
      : program.seasons > 1
      ? `${program.seasons} seasons`
      : `${program.seasons} season`;

    return (
      <>
        {/* for testing */}
        {/* <img className="background-image" src="https://i.ytimg.com/vi/oGTK1e1aewY/maxresdefault.jpg" alt=""/> */}

        {/* <img className="background-image" src={program.thumbnail} alt=""/> */}

        <section
          className="program-item-info"
          onMouseEnter={this.playThumbnail}
          onMouseLeave={this.pauseThumbnail}
        >
          <section className="program-item-thumb-details">
            <Link to={`/watch/${program.id}`}>
              <button className="play-full">
                <img className="item-play" src={window.playButton} alt="" />
              </button>
            </Link>

            <h4>{program.title}</h4>
            <aside className="rating-runtime">
              <span className="rating">{program.rating}</span>
              <span>{runtimeSeason}</span>
            </aside>
            <ul className="genres">{genres}</ul>
          </section>
          {likeButtons}
          {watchStatus}
        </section>
        {/* <section className="down-arrow-container">
          {this.detailsLink(this.props.displayType)}
        </section> */}
      </>
    );
  }
}

export default ProgramListItem;