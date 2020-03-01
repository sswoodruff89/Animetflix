import React from "react";
import LoadingPage from "../loading_page";
import WatchListContainer from "./watchlist_container";
import TvListContainer from "./tv_list_container";
import MovieListContainer from "./movie_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";

class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderErrors = this.renderErrors.bind(this);
    this.handleListDivision = this.handleListDivision.bind(this);
    this.handleListComponent = this.handleListComponent.bind(this);
    this.handleComponentMountUpdate = this.handleComponentMountUpdate.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.genresLoaded) {
      this.props.requestGenres();
    }

    this.handleComponentMountUpdate(this.props.displayType);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.profileId !== this.props.profileId) ||
      (prevProps.displayType !== this.props.displayType)
    ) {
      this.handleComponentMountUpdate(this.props.displayType);
    }
  }

  handleComponentMountUpdate(displayType) {
    switch (displayType) {
        case "watchlist":
            if (!this.props.programIds.length) {
                this.props.fetchWatchlist(this.props.profileId);
            }
            this.props.requestWatchlistPrograms(this.props.profileId);
            this.props.endLoadingPrograms();
            break;
        case "tv":
            this.props.requestProgramsByType("TV Show");
            break;
        case "movie":
            this.props.requestProgramsByType("Movie");
            break;
        default:
            break;
    }
  }

  handleListComponent(displayType, list, listNum) {
    switch (displayType) {
      case "watchlist":
        return <WatchListContainer list={list} listNum={listNum} />;
      case "tv":
        return <TvListContainer list={list} listNum={listNum} />;
      case "movie":
        return <MovieListContainer list={list} listNum={listNum} />;

    }
  }

  renderErrors() {
    return (
      <section className="watchlist-page">
        <section className="watchlist-errors">
          <p>Your watchlist is empty.</p>

          <p>Add a movie or show to your list</p>
        </section>
      </section>
    );
  }

  handleListDivision(programIds) {
    let programLists = [];

    if (programIds) {
      for (let i = 0; i < programIds.length; i += 6) {
        programLists.push(programIds.slice(i, i + 6));
      }
    }
    return programLists;
  }

  render() {
    if (this.props.loading) {
      return <LoadingPage />;
    }
    let displayType = this.props.displayType;

    /////////For ERRORS

    if (this.props.programIds.length === 0 && displayType === "watchlist") {
      return this.renderErrors();
    }
    //////////////

    let programLists = this.handleListDivision(this.props.programIds);

    return (
      <main className={`${displayType}-page`}>
        <section className={`${displayType}-list`}>
          {programLists.map((list, i) => {

            let programListComponent = this.handleListComponent(
              displayType,
              list,
              i
            );

            return (
              <section className={`${displayType}-list-detail-container`} key={i}>
                {programListComponent}
                <Route
                  path={`/${displayType}/${i}/:programId`}
                  component={ProgramDetailContainer}
                />
              </section>
            );
          })}
        </section>
      </main>
    );
  }
}

export default ProgramPage;
