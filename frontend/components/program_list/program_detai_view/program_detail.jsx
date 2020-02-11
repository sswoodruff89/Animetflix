import React from "react";
import Video from "../../video/video";
import {Link} from "react-router-dom";


class ProgramDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tab: "overview",
      currentId: (this.props.program) ? this.props.program.id : "",
      video: false,
      changing: false,
      watched: (this.props.watched) ? true : false,
      closing: false
    };
 
    this.handleTab = this.handleTab.bind(this);
    this.renderOverview = this.renderOverview.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.currentTabPage = this.currentTabPage.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

  }

  componentDidMount() {
     
    // if (this.props.programId) {
    //   this.props.requestProgram(this.props.programId);
    // } else {
      this.props.requestProgram(parseInt(this.props.match.params.programId));
    // }
    setTimeout(() => {
      this.setState({video: true});
    }, 1800);
  }

  componentDidUpdate() {
    ///For toggling between programs while Details is open
     
    let programId = parseInt(this.props.match.params.programId);
    if (this.state.currentId && programId !== this.state.currentId) {
      this.props.requestProgram(this.props.match.params.programId);
      this.setState({currentId: programId});
    }
  }

  handleTab(type) {
    return (e) => {
      e.preventDefault();
      let {tab, video} = this.state;

      ///Pause or play video
      if (video) {
        let vid = document.getElementById("video-player");
        (tab === "overview") ? vid.pause() : vid.play();
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
    this.setState({watched: !watchStatus});
  }

  closeDetails(e) {
    e.preventDefault();
    this.setState({closing: true, video: false});
    
    if (this.props.displayType === 'search') {
      setTimeout(() => {
        let queryAddress = this.props.history.location.pathname.split("/");
        this.props.history.push(`/search/${queryAddress[queryAddress.length - 2]}`);
      }, 600);
    } else {

      setTimeout(() => {
          this.props.history.goBack();
      }, 600);
    }
  }
  
  renderOverview(program, genres, fadeIn) {
    let score = {
      width: `${(program.score / 5) * 100}%`
    };

    let runtimeSeason = (program.runtime) ? program.runtime : 
      (program.seasons > 1) ? `${program.seasons} seasons`:
      `${program.seasons} season`

    let watchStatus = (this.state.watched) ? (
      <i className="fas fa-check"></i>
    ) : (
      <i className="fas fa-plus"></i>
    )

    return (
      <section className="detail-content-container"
        style={fadeIn}   >

        <aside className="rating-runtime">

          <div className="score" >
            <span className="stars"
              style={score}>
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

        <aside className="description">
          {program.description}
        </aside>

        <div className="detail-buttons">
            <button className="detail-play">
          <Link to={`/watch/${program.id}`} >
              <span>&#9654;</span>
              PLAY
          </Link>
            </button>
          <button className="detail-watchlist"
            onClick={this.handleWatchList}>
            {watchStatus}
            MY LIST
          </button>
        </div>

        <span className="genre-cap">
          Genres: {genres}
        </span>
      </section>
    )
  }

  renderDetails(program, genres, fadeIn) {
    return (
      <section className="detail-content-container"
        style={fadeIn}  >
        
        <div className="director">
          Directed by: {program.director}
        </div>

        <aside className="description">
          {program.description}
        </aside>


        <span className="genre-cap">
          Genres: {genres}
        </span>
      </section>
    )

  }

  currentTabPage(tab, program, genre) {
    let fadeIn = (!this.state.changing) ? {
      opacity: "1",
      transition: `opacity 100ms ease`
    } : {};
    ///fade in between renders

    switch (tab) {
      case "overview":
        return this.renderOverview(program, genre, fadeIn);
      case "details":
        return this.renderDetails(program, genre, fadeIn);
      default:
        return "";
    }
  }


  render() {
    let program = this.props.program || {};
    // debugger
    let genres = (this.props.genres) ? this.props.genres.join(", ") : "";
    let {tab, closing, video} = this.state;
    let paused = (tab !== "overview") ? "paused" : "";
    let closer = (closing) ? "closing" : "";

    let videoRender = (video) ? (<Video version={`detail ${paused}`} sourceVid={program.clip} />) : "";
    let detailBackImage = {
      backgroundImage: `url("${program.background}")`
    }
    return(

      <section className={`program-detail-page ${closer}`}
        style={detailBackImage} 
        >

          {videoRender}

          <section className="inner-detail-container">

              <button className={`detail-closer `}
                  onClick={this.closeDetails}>&#10060;</button>

            <header className="detail-logo-header">
              <div className={`logo-container ${tab}`}>
                <img className={`program-logo ${tab}`} src={program.logo} alt=""/>
                {/* <img className={`program-logo ${tab}`} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/dcgr6jq-e77501a0-57a5-4004-aa2f-b912f3ed9b9d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4YmY0OWViLWYwMWQtNDg1MS04MTBhLTZhYTZmYzMxNzEwN1wvZGNncjZqcS1lNzc1MDFhMC01N2E1LTQwMDQtYWEyZi1iOTEyZjNlZDliOWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RQcx0ZILiVpao-0a3VhorEaJDPXQPa9tK8s7-6bXe8I" alt="" /> */}
              </div>
          
            </header>

            {this.currentTabPage(tab, program, genres)}


        </section>

        <ul className="detail-tabs">
          <li key="1" className={(tab === 'overview') ? "current-tab" : ""}
            onClick={this.handleTab("overview")}>
            OVERVIEW
            <span className={(tab === 'overview') ? "current-tab" : ""}></span>
          </li>
          <li key="2" className={(tab === 'details') ? "current-tab" : ""}
            onClick={this.handleTab("details")}>
            DETAILS
            <span className={(tab === 'details') ? "current-tab" : ""}></span>
          </li>
        </ul>
      </section>
    )

  }

}

export default ProgramDetail;