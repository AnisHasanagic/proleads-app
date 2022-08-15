import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./Modal.scss";

function Modal({ show, closeModal, children }: any) {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div onClick={() => closeModal()} className="modal-overlay"></div>
            <div className="modal-content">
                <div className="close" onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                { children }
            </div>
        </div>
    );
}

export default Modal;
