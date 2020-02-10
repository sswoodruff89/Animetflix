import React from "react";
import {connect} from "react-redux";
import {receiveProgram} from '../../actions/program_actions';
import {withRouter} from "react-router-dom";
// import {selectProgramsByGenre} from "../../reducers/program_selector";
import ProgramList from "./program_list";

const msp = (state, ownProps) => {
  let programs

  if (ownProps.listType === "genre") {
    programs = (ownProps.listName.program_ids.length > 0) ? ownProps.listName.program_ids.map((programId) => {
      return state.entities.programs[programId];
    }) : [];
  } else {
    programs = (ownProps.listName.length > 0) ? ownProps.listName.map((watchedProgram) => {
      return state.entities.programs[watchedProgram.program_id];
    }) : [];
  }

  return {
    programs: programs,
    displayType: "browse",
    listType: ownProps.listType
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

