import React from "react";
import WatchListContainer from "./watchlist_container";
import MovieDetailContainer from "../movie_list/movie_detai_view/movie_detail_container";
import { Route } from "react-router-dom";

class WatchlistPage extends React.Component {

    constructor(props) {
        super(props);
        // this.listOptions = this.listOptions.bind(this);
        // this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        // if (this.props.watchlist.length === 0) {
            this.props.fetchWatchlist(this.props.profileId);
            this.props.requestWatchlistMovies(this.props.profileId);
        // }
    }

    render() {
        /////////For ERRORS

        if (this.props.movieIds.length === 0) {

            return (
                <section className="watchlist-errors">

                    <p>Your watchlist is empty.</p>

                    <p>Add a movie to add to your list</p>

                </section>
            )
        }
        //////////////

        let movieIds = this.props.movieIds || [];

        ////////
        let movieLists = [];
        for (let i = 0; i < movieIds.length; i += 6) {
            movieLists.push(movieIds.slice(i, i + 6));
        }
        ////////

        return (
            <main className="watchlist-page">
                {/* <section className="search-header">
                    <div className="expected-results">
                        Explore titles related to:
                     </div>
                    <section className="search-options">
                    </section>
                </section> */}
                <section className="watchlist-list">
                    {
                        movieLists.map((list, i) => {

                            return (
                                <section className="watchlist-list-detail-container" key={i}>
                                    <WatchListContainer list={list} listNum={i} />
                                    <Route path={`/watchlist/${i}/:movieId`} component={MovieDetailContainer} />
                                </section>
                            )
                        })
                    }
                </section>
            </main>
        )
    }
}

export default WatchlistPage;