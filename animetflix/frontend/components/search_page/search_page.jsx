import React from "react";


class SearchPage extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.requestSearchedMovies(this.props.match.params.searchQuery);
  }

  render() {
    debugger
    let query = this.props.match.params.searchQuery;

    return (
      <main className="search-page">

        <h2>SEARCH</h2>

      </main>
    )
  }
}

export default SearchPage;