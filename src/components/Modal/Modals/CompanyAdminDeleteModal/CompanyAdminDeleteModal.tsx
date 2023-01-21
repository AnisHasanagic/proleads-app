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
                <h3>Confirmation</h3>
            </div>
            <div className="description">
                <p>
                    Are you sure you want to {company.isDeleted ? 'activate' : 'delete'} company
                    <br />
                    <b>{company.name}</b>?
                </p>
            </div>
            <div className="actions">
                <Button onClick={closeModal} line>
                    Cancel
                </Button>
                <Button onClick={confirmDeletion} btnClass={company.isDeleted ? ButtonTypes.primary : ButtonTypes.danger}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}

export default CompanyAdminDeleteModal;
