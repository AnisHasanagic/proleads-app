import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import ExportCallsModal from "../../../components/Modal/Modals/ExportCallsModal/ExportCallsModal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCompanies } from "../../../store/company/company.actions";

import "./AdminExport.scss";

function AdminExport() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);

    const company = useSelector((state: any) => state.company);


    useEffect(() => {
        dispatch(loadCompanies());
    }, []);

    const showCompany = (Company: any) => {
        console.log(Company)
        setCurrentCompany(Company);
        navigate('/dashboard/admin-panel/export/'+Company.id, Company.id)
    };

    const actions = [
        {
            name: "Edit",
            row: "id",
            text: "Export",
            action: showCompany,
        },
    ];

    const columnsToShow = [
        "name",
        "address",
        "description",
        "company_info",
        "company_fields",
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
    ];

    return (
        <DashboardLayout>
            <section id="admin-company">
                    <div className="mr-3">
                        <h1>All company</h1>
                        <p>List of all company.</p>
                    </div>
                <Table
                    data={company.list}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
        </DashboardLayout>
    );
}

export default AdminExport;