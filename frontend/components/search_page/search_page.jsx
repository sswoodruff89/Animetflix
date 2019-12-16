import React from "react";
import SearchListContainer from "./search_list_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route } from "react-router-dom";

class SearchPage extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestSearchedMovies(this.props.match.params.searchQuery);
  }

  render() {
    let query = this.props.match.params.searchQuery;
    let { movieIds } = this.props;

////////
    let movieLists = [];
    for (let i = 0; i < movieIds.length; i += 6) {
      movieLists.push(movieIds.slice(i, i+6));
    }
////////

    return (
      <main className="search-page">

        <section className="search-list">
          {
            movieLists.map((list, i) => {

              return (
              <section className="search-list-detail-container" key={i}>
                  <SearchListContainer list={list} />
                  <Route path={`/search/${query}/:movieId`} component={MovieDetailContainer} />
              </section>
            )})
          }

        </section>
      </main>
    )
  }
}

export default SearchPage;