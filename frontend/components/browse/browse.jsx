import React from "react";
// import {logout} from "../actions/session_actions";
import ProgramListContainer from "../program_list/program_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route, Link, Switch } from "react-router-dom";
import BrowseShowcase from "./browse_showcase_container";
import LoadingPage from "../loading_page";
import Video from "../video/video";

class Browse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      watched: this.props.watched,
      listCount: 6
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleWatchList = this.handleWatchList.bind(this);
    this.renderWatchlist = this.renderWatchlist.bind(this);
  }

  componentDidMount() {
    this.props.requestGenres();
    this.props.fetchWatchlist(this.props.profileId);
    this.props.fetchLikes(this.props.profileId);
    this.props.fetchDislikes(this.props.profileId);
    this.props.requestAllPrograms();
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

  render() {
    const {genres, watchlist, loading} = this.props;

    if (loading) {
      return <LoadingPage />
    }

    // let firstProgramId = (genres[0] !== undefined) ? genres[0].program_ids[0] : null;

    // let showcase = (this.props.history.location.pathname.includes("showcase")) ?
    //   (<Route path="/browse/showcase/:programId" component={ProgramDetailContainer} displayType="showcase"/>) :
    //   this.renderHomeDetails(this.props.showcaseProgram);

    return (
      <main className="browse-background">

        <section className="browse-display">
          <BrowseShowcase programId={Math.floor(Math.random() * 49)}/>
        </section>

        <section className="lists-container">
          {this.renderWatchlist(watchlist)}

          {genres.slice(0, this.state.listCount).map((genre, i) => {
            //remove condition when done formatting
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
        })}

        </section>

      </main>
    );
  };
  
};

export default Browse;