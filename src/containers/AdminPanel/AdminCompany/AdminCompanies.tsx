import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import CompanyAdminModal from "../../../components/Modal/Modals/CompanyAdminModal/CompanyAdminModal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCompanies } from "../../../store/company/company.actions";

import "./AdminCompanies.scss";

function AdminCompanies() {
    const dispatch = useDispatch();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);

    const company = useSelector((state: any) => state.company);

    useEffect(() => {
        dispatch(loadCompanies());
    }, []);

    const showCompany = (Company: any) => {
        setIsAdd(false);
        setCurrentCompany(Company);
    };

    const actions = [
        {
            name: "Edit",
            row: "id",
            text: "Edit",
            action: showCompany,
        },
    ];

    const columnsToShow = [
        "id",
        "name",
        "address",
        "description",
        "company_info",
        "company_fields",
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
        "created_at",
        "updated_at",
    ];

    return (
        <DashboardLayout>
            <section id="admin-company">
                    <div className="mr-3">
                        <h1>All company</h1>
                        <p>List of all company.</p>
                    </div>
                    <Button
                        btnClass={ButtonTypes.primary}
                        customClass="ml-auto"
                        onClick={() => {
                            setIsAdd(true);
                            setCurrentCompany({
                                name: "",
                                address: "",
                                description: "",
                                company_info: "",
                                company_fields: "",
                                price_per_call: "",
                                price_per_minutes_overdue: "",
                                initial_time: "",
                                overdue_time: ""
                            });
                        }}
                    >
                        Add New
                    </Button>
                <Table
                    data={company.list}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            <Modal
                show={currentCompany}
                closeModal={() => setCurrentCompany(null)}
            >
                <CompanyAdminModal Company={currentCompany} isAdd={isAdd} />
            </Modal>
        </DashboardLayout>
    );
}

export default AdminCompanies;