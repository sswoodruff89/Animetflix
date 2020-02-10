import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgramList from "../program_list/program_list";

const msp = (state, ownProps) => {

    let programs = ownProps.list.map((id) => {
        return state.entities.programs[id];
    });

    return {
        programs: programs,
        displayType: "watchlist"
    };
};

const mdp = (dispatch) => {
    return {
        receiveProgram: (programId) => {
            return dispatch(receiveProgram(programId));
        }
    };
};

export default withRouter(connect(msp, mdp)(ProgramList));