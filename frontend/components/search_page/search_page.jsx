import React from "react";
import SearchListContainer from "./search_list_container";


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
    // let rows = this.props.movies.length % 6;

    return (
      <main className="search-page">

        <h2>SEARCH</h2>
        <section className="search-list">
          {/* {
            movieLists.map((list) => {
              <section className="single-list-container" >
                <SearchListContainer list={list} />
              </section>
                <Route path={`/search/${query}/:movieId`} component={MovieDetailContainer} />

            })
          } */}

        </section>
      </main>
    )
  }
}

export default SearchPage;