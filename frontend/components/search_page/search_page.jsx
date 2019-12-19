import React from "react";
import SearchListContainer from "./search_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route } from "react-router-dom";

class SearchPage extends React.Component{

  constructor(props) {
    super(props);
    this.listOptions = this.listOptions.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.requestSearchedMovies(this.props.match.params.searchQuery);
  }

  updateSearch(e) {
    e.preventDefault();
    let query = e.target.value;
    this.props.requestSearchedMovies(query);
    this.props.history.push(`/search/${query}`);
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
              className="list-buttons">{option}</button>
        )
      })
    }
  }

  render() {
    let query = this.props.match.params.searchQuery;

/////////For ERRORS

    if (this.props.errors[0] === "No movies found") {

      return (
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
      )
    }
//////////////

    let movieIds = this.props.movieIds || [];

////////
    let movieLists = [];
    for (let i = 0; i < movieIds.length; i += 6) {
      movieLists.push(movieIds.slice(i, i+6));
    }
////////

    return (
        <main className="search-page">
        <section className="search-header">
            <div className="expected-results">
              Explore titles related to:
            </div>
            <section className="search-options">
                {this.listOptions()}
            </section>
        </section>
          <section className="search-list">
            {
              movieLists.map((list, i) => {

                return (
                <section className="search-list-detail-container" key={i}>
                    <SearchListContainer list={list} listNum={i}/>
                    <Route path={`/search/${query}/${i}/:movieId`} component={MovieDetailContainer} />
                </section>
              )})
            }

          </section>
        </main>
      )
  }
}

export default SearchPage;