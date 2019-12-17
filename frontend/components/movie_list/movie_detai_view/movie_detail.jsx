import React from "react";
import Video from "../../video/video";


class MovieDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tab: "overview",
      currentId: this.props.movie.id,
      changing: false,
      closing: false
    };

    this.handleTab = this.handleTab.bind(this);
    this.renderOverview = this.renderOverview.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.currentTabPage = this.currentTabPage.bind(this);

    this.closeDetails = this.closeDetails.bind(this);

  }

  componentDidMount() {
    this.props.requestMovie(this.props.match.params.movieId);
  }

  componentDidUpdate() {
    ///For toggling between movies while Details is open
    
    let movieId = parseInt(this.props.match.params.movieId);
    if (this.state.currentId && movieId !== this.state.currentId) {
      this.props.requestMovie(this.props.match.params.movieId);
      this.setState({currentId: movieId});
    }
  }

  handleTab(type) {
    return (e) => {
      e.preventDefault();
      let {tab} = this.state;
      if (tab !== type) {
        this.setState({tab: type, changing: true});
        setTimeout(() => {
          this.setState({changing: false});
        }, 50);
      }
    };
  }

  closeDetails(e) {
    e.preventDefault();
    this.setState({closing: true});
    
    if (this.props.displayType === 'search') {
      setTimeout(() => {
        let queryAddress = this.props.history.location.pathname.split("/");
        this.props.history.push(`/search/${queryAddress[queryAddress.length - 2]}`);
      }, 600);
    } else {

      setTimeout(() => {
          this.props.history.push("/browse");
      }, 600);
    }
  }
  
  renderOverview(movie, genres, fadeIn) {

    return (
      <section className="detail-content-container"
        style={fadeIn}   >

        <aside className="rating-runtime">
          <span>{movie.yr}</span>
          <span className="rating">{movie.rating}</span>
          <span>{movie.runtime}</span>
        </aside>

        <aside className="description">
          {movie.description}
        </aside>

        <div className="detail-buttons">
          <button className="detail-play">
            <span>&#9654;</span>
            PLAY
              </button>
          <button className="detail-watchlist">
            <i className="fas fa-plus"></i>
            MY LIST
              </button>
        </div>

        <span className="genre-cap">
          Genres: {genres}
        </span>
      </section>
    )
  }

  renderDetails(movie, genres, fadeIn) {
    return (
      <section className="detail-content-container"
        style={fadeIn}  >

        <aside className="description">
          {movie.description}
        </aside>


        <span className="genre-cap">
          Genres: {genres}
        </span>
      </section>
    )

  }

  currentTabPage(tab, movie, genre) {
    let fadeIn = (!this.state.changing) ? {
      opacity: "1",
      transition: `opacity 100ms ease`
    } : {};
    ///fade in between renders


    switch (tab) {
      case "overview":
        return this.renderOverview(movie, genre, fadeIn);
      case "details":
        return this.renderDetails(movie, genre, fadeIn);
      default:
        return "";
    }
  }


  render() {
    let movie = this.props.movie || {};
    
    let genres = (this.props.genres) ? this.props.genres.join(", ") : "";
    let {tab, closing} = this.state;
    let closer = (closing) ? "closing" : "";
    
    return(

      <section className={`movie-detail-page ${closer}`}>

          <Video version="detail"/>

          <section className="inner-detail-container">

              <button className="detail-closer"
                  onClick={this.closeDetails}>&#10060;</button>

            <header className="detail-logo-header">
              <img className={`movie-logo ${tab}`} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/dcgr6jq-e77501a0-57a5-4004-aa2f-b912f3ed9b9d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4YmY0OWViLWYwMWQtNDg1MS04MTBhLTZhYTZmYzMxNzEwN1wvZGNncjZqcS1lNzc1MDFhMC01N2E1LTQwMDQtYWEyZi1iOTEyZjNlZDliOWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RQcx0ZILiVpao-0a3VhorEaJDPXQPa9tK8s7-6bXe8I" alt=""/>
              {/* <img className={`movie-logo ${tab}`} src={movie.logo} alt=""/> */}
          
            </header>

            {this.currentTabPage(tab, movie, genres)}


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

export default MovieDetail;