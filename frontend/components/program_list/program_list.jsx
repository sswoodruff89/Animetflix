import React from "react";
import ProgramListItemContainer from "./program_list_item_container";
import Video from "../video/video";
import { Link } from "react-router-dom";


class ProgramList extends React.Component {
  // maybe have a util function requesting backend for programs through this given genre
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
      // firstIdx: 0, //Index, not place, of first program in each slide
      // listLoop: 1,
    };

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    this.browseOrSearch = this.browseOrSearch.bind(this);
    this.handleLastHover = this.handleLastHover.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.clearProgramInfo = this.clearProgramInfo.bind(this);
    this.detailsLink = this.detailsLink.bind(this);
    this.renderProgramInfo = this.renderProgramInfo.bind(this);
    this.clearProgramInfoTimeOut;

    // this.detailOpen = this.detailOpen.bind(this);
    // this.showRange = this.showRange.bind(this);
    // this.alterList = this.alterList.bind(this);
  }

  //Scroll right
  toggleRight(e) {
    e.preventDefault();
    let { slideCount, lastProgram, tilEnd, firstIdx } = this.state;

    if (tilEnd <= 0) {
      slideCount = 0;
      lastProgram = 6;
      tilEnd = this.props.programs.length - 6;
    } else {
      slideCount += 1;
      lastProgram += tilEnd < 6 ? tilEnd : 6;
      tilEnd -= 6;
    }

    this.setState({ lastProgram, slideCount, tilEnd });
  }

  toggleLeft(e) {
    e.preventDefault();
    let { slideCount, lastProgram, tilEnd } = this.state;

    if (slideCount > 0) {
      slideCount -= 1;
      // firstIdx -= 6;
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
    // const program = this.props.program ? this.props.program : {};

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


  ///RENDERS BASED ON BROWSE OR SEARCH
  browseOrSearch(displayType) {
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
    const hide = slideCount === 0 ? "hidden" : "";

    let selectedPrograms = programs.slice(
      0,
      Math.min(lastProgram + 7, 24, programs.length)
    );
    let pageCountArray = Array.from(
      { length: Math.ceil(Math.min(24, this.props.programs.length) / 6) },
      (el, i) => i
    );

    ///how much to slide, depending on vicinity to End
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
          <ul className="program-slider search">
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={
                      i === lastProgram - 6 && !checkOpenDetail
                        ? "first-in-slide"
                        : i + 1 === lastProgram && !checkOpenDetail
                        ? "last-in-slide"
                        : ""
                    }
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

                    <Video version="thumbnail" sourceVid={program.clip} />

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
    } else if (displayType === "watchlist") {
      let listNum = this.props.listNum;
      let checkOpenDetail = this.props.history.location.pathname.includes(
        `watchlist/${listNum}`
      )
        ? true
        : false;

      return (
        <>
          <ul className="program-slider watchlist-list">
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={
                      i === lastProgram - 6 && !checkOpenDetail
                        ? "first-in-slide"
                        : i + 1 === lastProgram && !checkOpenDetail
                        ? "last-in-slide"
                        : ""
                    }
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

                    <Video version="thumbnail" sourceVid={program.clip} />

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
    } else if (displayType === "tv") {
      let listNum = this.props.listNum;
      let checkOpenDetail = this.props.history.location.pathname.includes(
        `tv/${listNum}`
      )
        ? true
        : false;

      return (
        <>
          <ul className="program-slider tv-list">
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={
                      i === lastProgram - 6 && !checkOpenDetail
                        ? "first-in-slide"
                        : i + 1 === lastProgram && !checkOpenDetail
                        ? "last-in-slide"
                        : ""
                    }
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

                    <Video version="thumbnail" sourceVid={program.clip} />

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
    } else if (displayType === "movie") {
      let listNum = this.props.listNum;
      let checkOpenDetail = this.props.history.location.pathname.includes(
        `movie/${listNum}`
      )
        ? true
        : false;

      return (
        <>
          <ul className="program-slider movie-list">
            {selectedPrograms.map((program, i) => {
              if (program) {
                return (
                  <li
                    key={i}
                    id={
                      i === lastProgram - 6 && !checkOpenDetail
                        ? "first-in-slide"
                        : i + 1 === lastProgram && !checkOpenDetail
                        ? "last-in-slide"
                        : ""
                    }
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

                    <Video version="thumbnail" sourceVid={program.clip} />

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
              className={`toggle-list-button left ${hide}`}
              onClick={this.toggleLeft}
            >
              <img
                className="left-arrow"
                src={window.leftArrow}
                alt="left-arrow"
              />
            </button>

            <ul className="program-slider" style={listRange}>
              {selectedPrograms.map((program, i) => {
                if (program) {
                  return (
                    <li
                      key={i}
                      id={
                        i === lastProgram - 6 && !checkOpenDetail
                          ? "first-in-slide"
                          : i + 1 === lastProgram && !checkOpenDetail
                          ? "last-in-slide"
                          : ""
                      }
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
                        sourceVid={program.clip}
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

            <ul className="slide-counter">
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
              className={`toggle-list-button right`}
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

    return <>{this.browseOrSearch(displayType)}</>;
  }
}

export default ProgramList;



  // showRange(i) {
  //   let startIdx = this.state.lastProgram - 6;
  //   let endIdx = this.state.lastProgram;
  //   ///for thumbnail trailing off edge

  //   return (i === startIdx) ? "i0" :
  //     (i === endIdx) ? "i6" :
  //       (i > startIdx && i <= endIdx) ? `i${i % 6}` : "";
  // }

  // alterList() {
  //   let numPrograms = this.props.programs.length;
  //   let {listLoop, lastProgram} = this.state;

  //   if (((numPrograms * listLoop) - lastProgram) < 12) {
  //     listLoop += 1;
  //     this.setState({listLoop});
  //   }
  // }

     // let programItemClass = ;
    /////Check if near end of list & duplicate list
    // if (this.props.programs) {
    //   programs = this.props.programs;

    //   if (listLoop > 1) {
    //     for (let i = 1; i <= listLoop; i++) {
    //       programs = programs.concat(programs);
    //     }
    //   }
    // } else {
    //   programs = [];
    // }
    ///////