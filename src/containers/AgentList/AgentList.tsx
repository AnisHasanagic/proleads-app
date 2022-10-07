import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import CallModal from "../../components/Modal/Modals/CallModal/CallModal";
import Table from "../../components/Table/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadCompanies } from "../../store/company/company.actions";

import "./AgentList.scss";

function AgentList() {
    const dispatch = useDispatch();

    const [currentCall, setCurrentCall] = useState<any>(null)
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
            name: "Call",
            row: "id",
            text: "Call",
            action: showCompany,
        },
    ];

    const columnsToShow = [
        "name",
        "address",
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
            <Modal
                show={currentCompany}
                closeModal={() => setCurrentCompany(null)}
            >
            <CallModal call={currentCall} companys={currentCompany} isAdd="true"/>
            </Modal>
        </DashboardLayout>
    );
}

export default AgentList;