import moment from "moment";
import React from "react";
import { Button, ButtonTypes } from "../../../Button/Button";
import { useDispatch } from "react-redux";

import "./CompanyAdminDeleteModal.scss";
import { updateCompany } from "../../../../store/company/company.actions";

function CompanyAdminDeleteModal({ company, closeModal }: any) {
    const dispatch = useDispatch();

    const confirmDeletion = () => {
        dispatch(
            updateCompany(
                {
                    ...company,
                    isDeleted: !company.isDeleted,
                },
                company.id
            )
        );
        closeModal();
    };

    if (!company) return null;

    return (
        <div id="company-admin-delete-modal">
            <div className="title">
                <h3>Bevestiging</h3>
            </div>
            <div className="description">
                {!company.isDeleted && <p>
                    Weet u zeker dat u bedrijf <b>{company.name}</b> wilt verwijderen?
                </p>}
                {company.isDeleted && <p>                
                    Weet je zeker dat je bedrijf <b>{company.name}</b> wilt activeren?
                </p>}
            </div>
            <div className="actions">
                <Button onClick={closeModal} line>
                    Annuleren
                </Button>
                <Button onClick={confirmDeletion} btnClass={company.isDeleted ? ButtonTypes.primary : ButtonTypes.danger}>
                    Bevestigen
                </Button>
            </div>
        </div>
    );
}

export default CompanyAdminDeleteModal;
