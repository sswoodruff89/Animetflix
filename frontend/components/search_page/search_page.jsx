import React from "react";
import SearchListContainer from "./search_list_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expectedResultsClicked: false
    };
    this.listOptions = this.listOptions.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleListDivision = this.handleListDivision.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.genresLoaded) {
      this.props.requestGenres();
    }
    this.props.requestSearchedPrograms(this.props.match.params.searchQuery);
  }

  updateSearch(e) {
    e.preventDefault();
    let query = e.target.value;
    query = query.split(":").join("");
    this.props.requestSearchedPrograms(query);
    this.props.history.push(`/search/${query}`);
    this.setState({ expectedResultsClicked: true });
  }

  listOptions() {
    if (this.props.searchlist) {
      let options = this.props.searchlist;

      return options.map((option, i) => {
        return (
          <button
            key={i}
            value={option}
            onClick={this.updateSearch}
            className="list-buttons"
          >
            {option}
          </button>
        );
      });
    }
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
    let query = this.props.match.params.searchQuery;

    /////////For ERRORS

    if (this.props.errors[0] === "No movies / shows found") {
      return (
        <main className="search-page">
          <section className="search-errors">
            <p>Your search for "{query}" did not have any matches.</p>

            <p>Suggestions:</p>

            <ul className="error-suggestions">
              <li>Try different keywords</li>
              <li>Looking for a movie or TV show?</li>
              <li>Try using a movie, TV show title, actor, or director</li>
              <li>Try a genre, like comedy, action, romance</li>
            </ul>
          </section>
        </main>
      );
    }
    //////////////

    let programLists = this.handleListDivision(this.props.programIds);

    return (
      <main className="search-page">
        <section className={`search-header`}>
          <div className="expected-results">Explore titles related to:</div>
          <section className="search-options">{this.listOptions()}</section>
        </section>
        <section className="search-list">
          {programLists.map((list, i) => {
            return (
              <section className="search-list-detail-container" key={i}>
                <SearchListContainer list={list} listNum={i} />
                <Route
                  path={`/search/${query}/${i}/:programId`}
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

export default SearchPage;