import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import ProfileFormContainer from "../session_form/profile_form_container";

const Modal = ({ modal, closeModal }) => {

  if (!modal) {
    return null;
  }

  let component;
  let modalBackClass;
  let modalChildClass;

  switch (modal.type) {
    case "newProfile":
      component = (
        <ProfileFormContainer closeModal={closeModal} formType="new" />
      );
      modalBackClass = "profile-form-modal";
      modalChildClass = "profile-fill-out-form";
      break;
    case "editProfile":
      component = (
        <ProfileFormContainer closeModal={closeModal} formType="edit" />
      );
      modalBackClass = "profile-form-modal";
      modalChildClass = "profile-fill-out-form";
      break;
    default:
      return null;
  }

  return (
    <div className={modalBackClass} onClick={closeModal}>
      <section className={modalChildClass} onClick={e => e.stopPropagation()}>
        {component}
      </section>
    </div>
  );

};

const msp = (state, ownProps) => { 
    return {
        modal: state.ui.modal
    }
}

const mdp = (dispatch) => {
    return {
        closeModal: () => {
            dispatch(closeModal());
        }
    }
}

export default connect(msp, mdp)(Modal);