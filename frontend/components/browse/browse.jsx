import React from "react";
// import {logout} from "../actions/session_actions";
import ProgramListContainer from "../program_list/program_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";
import BrowseShowcase from "./browse_showcase_container";
import LoadingPage from "../loading_page";
import Video from "../video/video";

class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.watched,
      listsLoaded: false,
      listCount: 6,
      loadMorePrograms: false
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.renderWatchlist = this.renderWatchlist.bind(this);
    this.addtoList = this.addtoList.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.requestGenres();
    if (this.props.genreIds) {
      this.props.startLoadingPrograms();
      this.props
        .requestProgramsByGenres(
          this.props.genreIds.slice(0, this.state.listCount)
        )
        .then(() => {
          setTimeout(() => {
            window.addEventListener("scroll", this.addtoList);
            this.setState({ listsLoaded: true });
          }, 1500);
        });
    }

    this.props.fetchWatchlist(this.props.profileId);
    this.props.fetchLikes(this.props.profileId);
    this.props.fetchDislikes(this.props.profileId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profileId !== this.props.profileId) {
      this.setState({ listCount: 6 });
      this.props
        .requestProgramsByGenres(
          this.props.genreIds.slice(0, this.state.listCount)
        )
        .then(() => {
          setTimeout(() => {
            // window.addEventListener("scroll", this.addtoList);
            this.setState({ listsLoaded: true });
          }, 1500);
        });
    }

    if (
      !prevProps.genreIds &&
      this.props.genreIds &&
      this.props.programsLoaded
    ) {
      this.props
        .requestProgramsByGenres(
          this.props.genreIds.slice(0, this.state.listCount)
        )
        .then(() => {
          setTimeout(() => {
            // window.addEventListener("scroll", this.addtoList);
            this.setState({ listsLoaded: true });
          }, 1500);
        });
    }
  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.addtoList);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }


  handleWatchList(e) {
    e.preventDefault();
    let watchStatus = this.state.watched;

    if (watchStatus) {
      this.props.removeFromWatchList(this.props.showcaseProgram.id);
    } else {
      this.props.addToWatchList(this.props.showcaseProgram.id);
    }
    this.setState({ watched: !watchStatus });
  }

  renderWatchlist(watchlist) {
    if (watchlist.length > 0) {
      return (
          <section className="list-and-detail-container">
            <section className="single-list-container" >
              <ProgramListContainer listName={watchlist} listType="watchlist" />
            </section>
            <Route path={`/browse/list_watchlist/:programId`}
              component={ProgramDetailContainer}
              displayType="browse" />
          </section>
      )
    } else {
      return ""
    }
  }

  addtoList() {
    if ((window.scrollY + window.innerHeight) >= (document.getElementById("root").offsetHeight * .75)) {
      const {listCount, loadMorePrograms} = this.state;

      if (listCount < 12 && !loadMorePrograms) {
        this.setState({ loadMorePrograms: true });

        const genreIds = this.props.genreIds.slice(listCount, listCount + 6);
        this.props.requestProgramsByGenres(genreIds).then(() => {
          this.setState({ listCount: listCount + 6, loadMorePrograms: false })
        });
      } else if (listCount === 12 && !loadMorePrograms) {
        window.removeEventListener("scroll", this.addtoList);
      }
    }
  }

  render() {
    const {genres, watchlist, loading} = this.props;

    if (loading) {
      return <LoadingPage />
    }

    return (
      <main className="browse-background">
        <section className="browse-display">
          <BrowseShowcase />
        </section>

        <section className={`lists-container ${this.state.listsLoaded}`}>
          {this.renderWatchlist(watchlist)}

          {genres.slice(0, this.state.listCount).map((genre, i) => {

////////////////Main Lists////////////////////////////
          if (genre.program_ids.length > 6) {
            return (
                <section className="list-and-detail-container" key={i}>
                  <section className="single-list-container" >
                    <ProgramListContainer listName={genre} listType="genre"/>
                  </section>
                    <Route path={`/browse/list_${genre.name}/:programId`} 
                    component={ProgramDetailContainer} 
                    key={genre.id}
                    displayType="browse"/>
              </section>
              )
          }
//////////////////////////////////////////////////////

        })}
        </section>
      </main>
    );
  };
  
};

export default Browse;