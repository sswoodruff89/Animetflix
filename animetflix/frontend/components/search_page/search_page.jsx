import React from "react";


class SearchPage extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    let query = this.props.match.params.searchQuery;

    return (
      <main className="search-page">

        <h2>{query}</h2>

      </main>
    )
  }
}

export default SearchPage;