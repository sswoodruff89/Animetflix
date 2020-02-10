import React from "react";
import Video from "../video/video";
import ProgramDetailContainer from "../program_list/program_detai_view/program_detail_container";
import { Link, Route } from "react-router-dom";

class Showcase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: this.props.watched
        };
        this.renderHomeDetails = this.renderHomeDetails.bind(this);
        this.handleWatchList = this.handleWatchList.bind(this);
    }

    handleWatchList(e) {
        e.preventDefault();
        let watchStatus = this.state.watched;

        if (watchStatus) {
            this.props.removeFromWatchList(this.props.showcaseProgram.id);
        } else {
            this.props.addToWatchList(this.props.showcaseProgram.id);
        }
        this.setState({ watched: !watchStatus });
    }

    renderHomeDetails(program) {
        if (program) {
            clearTimeout(this.showcaseDisplay);
 
            ////////////
            let sourceVid = program.clip || null;

            let watchStatus = (this.state.watched) ? (
                <span className="button-icon">
                    <i className="fas fa-check"></i>
                </span>
            ) : (
                <span className="button-icon">
                    <i className="fas fa-plus"></i>
                </span>
                )
            return (
                <>
                    <div className="vid-container">
                        <Video version="showcase" sourceVid={sourceVid} />
                    </div>
                    <section className="showcase-container">


                        <div className="logo-and-buttons">
                            <div className={`showcase-logo-container`}>
                                <img className={`program-logo`} src={program.logo} alt="logo"/>
                                {/* <img className={`program-logo `} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/dcgr6jq-e77501a0-57a5-4004-aa2f-b912f3ed9b9d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q4YmY0OWViLWYwMWQtNDg1MS04MTBhLTZhYTZmYzMxNzEwN1wvZGNncjZqcS1lNzc1MDFhMC01N2E1LTQwMDQtYWEyZi1iOTEyZjNlZDliOWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RQcx0ZILiVpao-0a3VhorEaJDPXQPa9tK8s7-6bXe8I" alt="" /> */}
                            </div>

                            <div className="showcase-detail-buttons">
                                <button className="showcase-play">
                                    <Link to={`/watch/${program.id}`} >
                                        <span className="button-icon">&#9654;</span>
                                        <span>Play</span>
                                    </Link>
                                </button>

                                <button className="showcase-watchlist" onClick={this.handleWatchList}>
                                    {watchStatus}
                                    <span>My List</span>
                                </button>

                                <button className="showcase-more-info">
                                    <Link to={`/browse/showcase/${program.id}`} >
                                        <span className="button-icon">&#x24D8;</span>
                                        <span>More Info</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </section>
                    {/* }} /> */}
                    {/* <Route path={`/showcase/:programId`} component={ProgramDetailContainer} displayType="showcase"/> */}
                </>
            )
        } else {
            this.showcaseDisplay = setTimeout(() => {
                this.renderHomeDetails(program)
            }, 5000);
        }
    }



    render() {
        let {showcaseProgram} = this.props;
        
         
        
        let showcase = (this.props.history.location.pathname.includes("showcase")) ?
            (<Route path="/browse/showcase/:programId" 
                component={ProgramDetailContainer} 
                    displayType="showcase" 
                        programId={showcaseProgram.id}
                        />) :
            this.renderHomeDetails(showcaseProgram);

        return (
            <>
                {showcase}
            </>
        )

    }
}

export default Showcase;