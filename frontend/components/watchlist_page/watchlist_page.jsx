import React from "react";
import WatchListContainer from "./watchlist_container";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
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
            this.props.requestWatchlistPrograms(this.props.profileId);
        // }
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
                {/* <section className="search-header">
                    <div className="expected-results">
                        Explore titles related to:
                     </div>
                    <section className="search-options">
                    </section>
                </section> */}
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