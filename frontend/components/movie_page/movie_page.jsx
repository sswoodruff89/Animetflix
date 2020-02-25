import React from "react";
import MovieListContainer from "./movie_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.genresLoaded) {
      this.props.requestGenres();
    }
    this.props.requestProgramsByType("Movie");
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
      <main className="movie-page">

        <section className="movie-list">
          {programLists.map((list, i) => {
            return (
              <section className="movie-list-detail-container" key={i}>
                <MovieListContainer list={list} listNum={i} />
                <Route
                  path={`/movie/${i}/:programId`}
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

export default MoviePage;
