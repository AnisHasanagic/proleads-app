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

import GetAppIcon from '@material-ui/icons/GetApp';
import { Input } from "../../../components/Input/Input";

function AdminExport() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);
    const user = useSelector((state: any) => state.user)
    const company = useSelector((state: any) => state.company);
    const [searchValue, setSearchValue] = useState("")



    useEffect(() => {
        dispatch(loadCompanies(user.id));
    }, []);

    const showCompany = (Company: any) => {
        console.log(Company)
        setCurrentCompany(Company);
        navigate('/dashboard/admin-panel/export/' + Company.id, Company.id)
    };

    const actions = [
        {
            name: "Export",
            row: "id",
            icon: <GetAppIcon />,
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

    const keys = columnsToShow
    const search = (data: any) => {
        return data.filter(
            (item: any) =>
                keys.some(key => item[key].toString().toLowerCase().includes(searchValue)))
    }

    return (
        <DashboardLayout>
            <section id="admin-company">
                <div className="mr-3">
                    <h1>All company</h1>
                    <p>List of all company.</p>
                </div>
                <div className="search-butt">
                <Input
                    id={"search"}
                    type={"text"}
                    className={"search"}
                    onChange={(e: any): void => setSearchValue(e.target.value)}
                    placeholder={"Search..."}
                />
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