import React from "react";
import WatchListContainer from "./watchlist_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Route } from "react-router-dom";

class WatchlistPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.genresLoaded) {
            this.props.requestGenres();
        }
        this.props.fetchWatchlist(this.props.profileId);
        this.props.requestWatchlistPrograms(this.props.profileId);
    }

    render() {
        /////////For ERRORS

        if (this.props.programIds.length === 0) {

            return (
                <section className="watchlist-errors">

                    <p>Your watchlist is empty.</p>

                    <p>Add a movie or show to your list</p>

                </section>
            )
        }
        //////////////

        let programIds = this.props.programIds || [];

        ////////
        let programLists = [];
        for (let i = 0; i < programIds.length; i += 6) {
            programLists.push(programIds.slice(i, i + 6));
        }
        ////////

        return (
            <main className="watchlist-page">
                <section className="watchlist-list">
                    {
                        programLists.map((list, i) => {

                            return (
                                <section className="watchlist-list-detail-container" key={i}>
                                    <WatchListContainer list={list} listNum={i} />
                                    <Route path={`/watchlist/${i}/:programId`} component={ProgramDetailContainer} />
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