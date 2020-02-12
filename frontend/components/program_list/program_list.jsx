import React from "react";
import ProgramListItemContainer from "./program_list_item_container";
import Video from "../video/video";

class ProgramList extends React.Component{
// maybe have a util function requesting backend for programs through this given genre
  constructor(props) {
    super(props);
    this.state = {
      displayType: this.props.displayType,
      lastProgram: 6,
      nearEnd: (Math.min(18, this.props.programs.length) - 6) < 6,
      tilEnd: (Math.min(18, this.props.programs.length - 6)),
      slideCount: 0
      // firstIdx: 0, //Index, not place, of first program in each slide
      // listLoop: 1,
    };

    this.toggleRight = this.toggleRight.bind(this);
    this.toggleLeft = this.toggleLeft.bind(this);
    this.browseOrSearch = this.browseOrSearch.bind(this);
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
      lastProgram += (tilEnd < 6) ? tilEnd : 6;
      tilEnd -= 6;
    }

    this.setState({ lastProgram, slideCount, tilEnd });
  }

  toggleLeft(e) {
    e.preventDefault();
    let {slideCount, lastProgram, tilEnd } = this.state;
    
    if (slideCount > 0) {
      slideCount -= 1;
      // firstIdx -= 6;
      tilEnd += 6;
      lastProgram -= (tilEnd < 6) ? tilEnd : 6;
      this.setState({slideCount, lastProgram, tilEnd});
    }
  }

  
  ///CHECKS IF A DETAIL PAGE IS OPEN
  detailOpen(i) {
    let detailProgramId = this.props.history.location.pathname.split("/");
    detailProgramId = parseInt(detailProgramId[detailProgramId.length - 1]);

    return (detailProgramId === i) ? "detail-open-true" : "detail-open-false";
  }

  ////Visualize slide page
  renderSlidePage() {
    let pageCount = Math.floor(Math.min(24, this.props.programs.length) / 6);

    return (
      <ul className="slide-page">
      </ul>
    )
  }


 ///RENDERS BASED ON BROWSE OR SEARCH
  browseOrSearch(displayType) {

    const listName = (this.props.listType === "genre") ? this.props.listName.name : 
      (this.props.listType === "watchlist") ? "Watchlist" : "";
    const { slideCount, tilEnd, lastProgram } = this.state;
    let programs = (this.props.programs) ? this.props.programs : [];
    const hide = (slideCount === 0) ? "hidden" : "";

    ///how much to slide, depending on vicinity to End
    let slideMovePercentage;
    if (slideCount === 0) {
      slideMovePercentage = 0;
    } else {
      let endPercentage = (tilEnd && tilEnd < 6 && lastProgram % 6 > 0) ? (
        (100 - ((lastProgram % 6) / 6) * 100)
      ) : 0;
      slideMovePercentage = ((100 * (slideCount) + .1) - (endPercentage));
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
      let checkOpenDetail = (this.props.history.location.pathname.includes(`${searchQuery}/${listNum}`)) ? true : false;
      
      return (
        <>
          <ul className="program-slider search" >
            {programs.map((program, i) => {
                if (program) {
                  return (
                    <li key={i}
                      id={(i === 0 && !checkOpenDetail) ? "first-in-slide" : ""}
                      className={(checkOpenDetail) ? `program-item-${this.detailOpen(program.id)}` : "program-item"}>

                      <ProgramListItemContainer program={program} 
                        listNum={this.props.listNum}
                        displayType={displayType}/>

                    </li>
                  )
                }
              })}
          </ul>
        </>
      )
    } else if (displayType === "watchlist") {
      let listNum = this.props.listNum;
      let checkOpenDetail = (this.props.history.location.pathname.includes(`watchlist/${listNum}`)) ? true : false;

      return (
        <>
          <ul className="program-slider watchlist-list" >
            {programs.map((program, i) => {
              if (program) {
                return (
                  <li key={i}
                    id={(i === 0 && !checkOpenDetail) ? "first-in-slide" : ""}
                    className={(checkOpenDetail) ? `program-item-${this.detailOpen(program.id)}` : "program-item"}>

                    <ProgramListItemContainer program={program}
                      listNum={this.props.listNum}
                      displayType={displayType} />

                  </li>
                )
              }
            })}
          </ul>
        </>
      )
    } else {
      let checkOpenDetail = (this.props.history.location.pathname.includes(`list_${listName}`)) ? true : false;

      return (
        <>
          <h3 className={`list-name`}>{listName}</h3>
          <ul className="list-with-buttons">

            <button className={`toggle-list-button left ${hide}`}
              onClick={this.toggleLeft}>
              <img className="left-arrow" src={window.leftArrow} alt="left-arrow" />

            </button>

            <ul className="program-slider" style={listRange}>

              {
                programs.slice(0, 24).map((program, i) => {
                  if (program) {
                    return (
                      <li key={i}
                        id={(i === 0 && !checkOpenDetail) ? "first-in-slide" : ""}
                        className={(checkOpenDetail) ? `program-item-${this.detailOpen(program.id)}` : "program-item"}>
                        <ProgramListItemContainer program={program} displayType={displayType} listName={listName} />
                      </li>
                    )
                  }
                })
              }

            </ul>



            <button className={`toggle-list-button right`}
              onClick={this.toggleRight}>
              <img className="right-arrow" src={window.rightArrow} alt="right-arrow" />
            </button>
          </ul>
        </>
      )
    }
  }





  render() {
    const {displayType} = this.state;

    return(
      <>
        {this.browseOrSearch(displayType)}
      </>
    )
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