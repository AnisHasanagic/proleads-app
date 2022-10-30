import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import CompanyAdminModal from "../../../components/Modal/Modals/CompanyAdminModal/CompanyAdminModal";
import AssignModal from "../../../components/Modal/Modals/AssignModal/AssignModal"
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCompanies } from "../../../store/company/company.actions";
import { Input } from "../../../components/Input/Input";
import "./AdminCompanies.scss";

import EditIcon from "@material-ui/icons/Edit";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

let PageSize = 10;


function AdminCompanies() {

    const [currentPage, setCurrentPage] = useState(1);



    const dispatch = useDispatch();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);


    const [isAssign, setIsAssign] = useState<any>(false);

    const company = useSelector((state: any) => state.company);
    const [searchValue, setSearchValue] = useState("")

    const user = useSelector((state: any) => state.user)

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return company.list.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    useEffect(() => {
        dispatch(loadCompanies(user.id));
    }, []);

    const showCompany = (Company: any) => {
        setIsAdd(false);
        setIsAssign(false)
        setCurrentCompany(Company);
    };

    const showUsers = (Company: any) => {
        setIsAdd(false);
        setIsAssign(true)
        setCurrentCompany(Company);
    };

    const actions = [
        {
            name: "Edit",
            row: "id",
            icon: <EditIcon />,
            action: showCompany,
        },
        {
            name: "Assign",
            row: "id",
            icon: <AssignmentIndIcon />,
            action: showUsers,
        }
    ];

    const columnsToShow = [
        "name",
        "address",
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
                    <Button
                        btnClass={ButtonTypes.primary}
                        customClass="ml-auto"
                        onClick={() => {
                            setIsAdd(true);
                            setIsAssign(false)
                            setCurrentCompany({
                                name: "",
                                address: "",
                                email: "",
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
                </div>
                <Table
                    data={search(company.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            
            </section>
            {!isAssign && (
                <Modal
                    show={currentCompany}
                    closeModal={() => setCurrentCompany(null)}
                >
                    <CompanyAdminModal company={currentCompany} isAdd={isAdd} />
                </Modal>
            )}
            {isAssign && (
                <Modal
                    show={currentCompany}
                    closeModal={() => setCurrentCompany(null)}
                >
                    <AssignModal company={currentCompany} isAdd={isAdd} />
                </Modal>)}

        </DashboardLayout>
    );
}

export default AdminCompanies;