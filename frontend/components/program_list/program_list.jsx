import React from "react";
import ProgramListItemContainer from "./program_list_item_container";
import Video from "../video/video";
import { Link } from "react-router-dom";


class ProgramList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayType: this.props.displayType,
      showProgramInfo: {},
      lastProgram: 6,
      lastHover: false,
      nearEnd: Math.min(18, this.props.programs.length) - 6 < 6,
      tilEnd: Math.min(18, this.props.programs.length - 6),
      slideCount: 0
    };

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    this.renderListType = this.renderListType.bind(this);
    this.handleLastHover = this.handleLastHover.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.clearProgramInfo = this.clearProgramInfo.bind(this);
    this.detailsLink = this.detailsLink.bind(this);
    this.renderProgramInfo = this.renderProgramInfo.bind(this);
    this.slidePositionId = this.slidePositionId.bind(this);

    this.clearProgramInfoTimeOut;
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();

    let { slideCount, lastProgram, tilEnd } = this.state;

    if (tilEnd <= 0) {
      slideCount = 0;
      lastProgram = 6;
      tilEnd = Math.min(18, this.props.programs.length - 6);
      this.setState({ slideCount, tilEnd });

      ///Delay on trimming listing
      setTimeout(() => {
        this.setState({ lastProgram });
      }, 500);

    } else {
      slideCount += 1;
      lastProgram += tilEnd < 6 ? tilEnd : 6;
      tilEnd -= 6;
      this.setState({ lastProgram, slideCount, tilEnd });
    }

  }

  toggleLeft(e) {
    e.preventDefault();
    let { slideCount, lastProgram, tilEnd } = this.state;

    if (slideCount > 0) {
      slideCount -= 1;
      tilEnd += 6;
      lastProgram -= tilEnd < 6 ? tilEnd : 6;
      this.setState({ slideCount, lastProgram, tilEnd });
    }
  }

  handleLastHover(e) {
    e.preventDefault();
    if (e.currentTarget.id === "last-in-slide") {
      this.setState({ lastHover: !this.state.lastHover });
    }
  }

  handleHover(programId) {
    return e => {
      e.preventDefault();

      clearTimeout(this.clearProgramInfoTimeOut);

      let { showProgramInfo, lastHover } = this.state;

      if (e.currentTarget.id === "last-in-slide") {
        lastHover = !lastHover;
      } else {
        lastHover = false;
      }
      if (!showProgramInfo[programId]) {
        showProgramInfo[programId] = true;
      }

      this.setState({ showProgramInfo, lastHover });
    };
  }

  clearProgramInfo(e) {
    e.preventDefault();

    setTimeout(() => {
      this.setState({ showProgramInfo: {} });
    }, 1000);
  }

  ///CHECKS IF A DETAIL PAGE IS OPEN
  detailOpen(i) {
    let detailProgramId = this.props.history.location.pathname.split("/");
    detailProgramId = parseInt(detailProgramId[detailProgramId.length - 1]);

    return detailProgramId === i ? "detail-open-true" : "detail-open-false";
  }


  detailsLink(displayType, listName, programId, listNum) {
    if (displayType === "browse") {
      return (
        <Link to={`/browse/list_${listName}/${programId}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "search") {
      return (
        <Link
          to={`/search/${this.props.match.params.searchQuery}/${listNum}/${programId}`}
        >
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "watchlist") {
      return (
        <Link to={`/watchlist/${listNum}/${programId}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "tv") {
      return (
        <Link to={`/tv/${listNum}/${programId}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    } else if (displayType === "movie") {
      return (
        <Link to={`/movie/${listNum}/${programId}`}>
          <img className="down-arrow" src={window.downArrow} alt="down-arrow" />
        </Link>
      );
    }
  }

  renderProgramInfo(program, displayType, showProgramInfo) {
    if (showProgramInfo[program.id]) {
      return (
        <ProgramListItemContainer
          program={program}
          listNum={this.props.listNum}
          displayType={displayType}
        />
      );
    }
  }

  slidePositionId(i, lastProgram, checkOpenDetail) {
    return i === lastProgram - 6 && !checkOpenDetail
      ? "first-in-slide"
      : i + 1 === lastProgram && !checkOpenDetail
        ? "last-in-slide"
        : i === lastProgram - 7
          ? "before-first"
          : i + 1 === lastProgram + 1
            ? "after-last"
            : ""
  }

  ///RENDERS BASED ON BROWSE / SEARCH / MEDIA PAGES
  renderListType(displayType) {
    const listName =
      this.props.listType === "genre"
        ? this.props.listName.name
        : this.props.listType === "watchlist"
        ? "Watchlist"
        : "";

    const {
      slideCount,
      tilEnd,
      lastProgram,
      lastHover,
      showProgramInfo
    } = this.state;

    let programs = this.props.programs ? this.props.programs : [];

    /////Hide Buttons and Slide Count for short lists////
    const hideLeft = slideCount === 0 ? "hidden" : "";
    const hideRight = programs.length <= 6 ? "hidden" : "";
    /////////

    const shortList = programs.length === 1 ? "short" : "";

    ////Renders Pieces of List at a Time////
    let selectedPrograms = programs.slice(
      0,
      Math.min(lastProgram + 7, 24, programs.length)
    );
    /////

    /////For Slide Counter CSS////
    let pageCountArray = Array.from(
      { length: Math.ceil(Math.min(24, this.props.programs.length) / 6) },
      (el, i) => i
    );
    //////

    /////How much to slide, depending on vicinity to End
    let slideMovePercentage;
    if (slideCount === 0) {
      slideMovePercentage = 0;
    } else {
      let endPercentage =
        tilEnd && tilEnd < 6 && lastProgram % 6 > 0
          ? 100 - ((lastProgram % 6) / 6) * 100
          : 0;
      slideMovePercentage = 100 * slideCount + 0.1 - endPercentage;
    }
    //////

    ////Style attribute to move list left/right
    const listRange = {
      transform: `translateX(-${slideMovePercentage}%)`,
      transition: "all 0.8s ease-out"
    };

    if (displayType === "search") {
      let searchQuery = this.props.match.params.searchQuery;
      let listNum = this.props.listNum;

      let checkOpenDetail = this.props.history.location.pathname.includes(
        `${searchQuery}/${listNum}`
      )
        ? true
        : false;

      return (
        <>
          <ul className={`program-slider search ${shortList}`}>
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={() => this.slidePositionId(i)}
                    className={
                      checkOpenDetail
                        ? `program-item-${this.detailOpen(program.id)}`
                        : `program-item ${
                            i + 1 < lastProgram && !checkOpenDetail && lastHover
                              ? "last-hover"
                              : ""
                          }`
                    }
                    onMouseEnter={this.handleHover(program.id)}
                    onMouseLeave={this.handleHover(program.id)}
                  >
                    <img
                      className="background-image"
                      src={program.thumbnail}
                      alt=""
                    />

                    <Video version="thumbnail" sourceVid={program.thumbclip} />

                    {this.renderProgramInfo(
                      program,
                      displayType,
                      showProgramInfo
                    )}

                    <section className="down-arrow-container">
                      {this.detailsLink(
                        displayType,
                        this.props.match.params.searchQuery,
                        program.id,
                        listNum
                      )}
                    </section>
                  </li>
                );
              }
            })}
          </ul>
        </>
      );
    } else if (displayType === "tv" || displayType === "movie" || displayType === "watchlist") {
      let listNum = this.props.listNum;
      let checkOpenDetail = this.props.history.location.pathname.includes(
        `${displayType}/${listNum}`
      )
        ? true
        : false;

      return (
        <>
          <ul className={`program-slider ${displayType}-list ${shortList}`}>
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={() => this.slidePositionId(i)}
                    className={
                      checkOpenDetail
                        ? `program-item-${this.detailOpen(program.id)}`
                        : `program-item ${
                            i + 1 < lastProgram && !checkOpenDetail && lastHover
                              ? "last-hover"
                              : ""
                          }`
                    }
                    onMouseEnter={this.handleHover(program.id)}
                    onMouseLeave={this.handleHover(program.id)}
                  >

                    <img
                      className="background-image"
                      src={program.thumbnail}
                      alt=""
                    />

                    <Video version="thumbnail" sourceVid={program.thumbclip} />

                    {this.renderProgramInfo(
                      program,
                      displayType,
                      showProgramInfo
                    )}

                    <section className="down-arrow-container">
                      {this.detailsLink(
                        displayType,
                        null,
                        program.id,
                        listNum
                        )}
                    </section>
                  </li>
                );
              }
            })}
          </ul>
        </>
      );
    } else {
      let checkOpenDetail = this.props.history.location.pathname.includes(
        `list_${listName}`
      )
        ? true
        : false;

      return (
        <>
          <h3 className={`list-name`}>{listName}</h3>

          <ul
            className="list-with-buttons"
          >
            <button
              className={`toggle-list-button left ${hideLeft}`}
              onClick={this.toggleLeft}
            >
              <img
                className="left-arrow"
                src={window.leftArrow}
                alt="left-arrow"
              />
            </button>

            <ul className={`program-slider ${shortList}`} style={listRange}>
              {selectedPrograms.map((program, i) => {
                if (program) {
                  return (
                    <li
                      key={i}
                      id={this.slidePositionId(i, lastProgram, checkOpenDetail)}
                      className={
                        checkOpenDetail
                          ? `program-item-${this.detailOpen(program.id)}`
                          : `program-item ${
                              i + 1 < lastProgram &&
                              !checkOpenDetail &&
                              lastHover
                                ? "last-hover"
                                : ""
                            }`
                      }
                      onMouseEnter={this.handleHover(program.id)}
                      onMouseLeave={this.handleHover(program.id)}
                    >
                      <img
                        className="background-image"
                        src={program.thumbnail}
                        alt=""
                      />

                      <Video
                        version="thumbnail"
                        sourceVid={program.thumbclip}
                      />


                      {this.renderProgramInfo(
                        program,
                        displayType,
                        showProgramInfo
                      )}

                      <section className="down-arrow-container">
                        {this.detailsLink(
                          displayType, 
                          listName, 
                          program.id)}
                      </section>

                    </li>
                  );
                }
              })}
            </ul>

            <ul className={`slide-counter ${hideRight}`}>
              {pageCountArray.map(slide => {
                return (
                  <li
                    key={slide}
                    className={`slide-count ${
                      slide === slideCount ? "current" : ""
                    }`}
                  ></li>
                );
              })}
            </ul>

            <button
              className={`toggle-list-button right ${hideRight}`}
              onClick={this.toggleRight}
            >
              <img
                className="right-arrow"
                src={window.rightArrow}
                alt="right-arrow"
              />
            </button>
          </ul>
        </>
      );
    }
  }

  render() {
    const { displayType } = this.state;

    return <>{this.renderListType(displayType)}</>;
  }
}

export default ProgramList;

