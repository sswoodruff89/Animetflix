import React from "react";
import TvListContainer from "./tv_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";

class TvPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.genresLoaded) {
      this.props.requestGenres();
    }
    this.props.requestProgramsByType("TV Show");
  }

  render() {
    let programIds = this.props.programIds || [];

    ////////
    let programLists = [];
    for (let i = 0; i < programIds.length; i += 6) {
      programLists.push(programIds.slice(i, i + 6));
    }
    ////////

    return (
      <main className="tv-page">

        <section className="tv-list">
          {programLists.map((list, i) => {
            return (
              <section className="tv-list-detail-container" key={i}>
                <TvListContainer list={list} listNum={i} />
                <Route
                  path={`/tv/${i}/:programId`}
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

export default TvPage;
