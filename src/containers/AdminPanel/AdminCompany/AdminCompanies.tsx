import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import CompanyAdminModal from "../../../components/Modal/Modals/CompanyAdminModal/CompanyAdminModal";
import AssignModal from "../../../components/Modal/Modals/AssignModal/AssignModal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCompanies } from "../../../store/company/company.actions";
import { Input } from "../../../components/Input/Input";
import "./AdminCompanies.scss";

import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import CompanyAdminDeleteModal from "../../../components/Modal/Modals/CompanyAdminDeleteModal/CompanyAdminDeleteModal";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

function AdminCompanies() {
    const dispatch = useDispatch();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [modalType, setModalType] = useState<any>("");

    const company = useSelector((state: any) => state.company);
    const [searchValue, setSearchValue] = useState("");

    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(loadCompanies(true));
    }, []);

    useEffect(() => {
        setCurrentCompany(null);
    }, [company.list]);

    const showCompany = (company: any) => {
        setModalType("edit");
        setCurrentCompany(company);
    };

    const showUsers = (company: any) => {
        setModalType("assign");
        setCurrentCompany(company);
    };

    const deleteCompany = (company: any) => {
        setModalType("delete");
        setCurrentCompany(company);
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
        },
        {
            name: "Delete",
            row: "id",
            icon: <DeleteIcon />,
            action: deleteCompany,
        },
    ];

    const columnsToShow = [
        "name",
        "address",
        "email",
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
    ];

    const keys = columnsToShow;
    const search = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) =>
                item[key].toString().toLowerCase().includes(searchValue)
            )
        );
    };
    return (
        <DashboardLayout>
            <section id="admin-company">
                <div className="mr-3">
                    <h1>Allemaal gezelschap</h1>
                    <p>Lijst van alle bedrijven.</p>
                </div>
                <div className="search-butt">
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void =>
                            setSearchValue(e.target.value)
                        }
                        placeholder={"Zoekopdracht..."}
                    />
                    <Button
                        btnClass={ButtonTypes.primary}
                        customClass="ml-auto"
                        onClick={() => {
                            setModalType("add");
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
                                overdue_time: "",
                            });
                        }}
                    >
                        + Nieuw toevoegen
                    </Button>
                </div>
                <Table
                    data={search(company.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            {(modalType === "add" || modalType === "edit") && (
                <Modal
                    show={currentCompany}
                    closeModal={() => setCurrentCompany(null)}
                >
                    <CompanyAdminModal
                        company={currentCompany}
                        isAdd={modalType === "add"}
                    />
                </Modal>
            )}
            {modalType === "assign" && (
                <Modal
                    show={currentCompany}
                    closeModal={() => setCurrentCompany(null)}
                >
                    <AssignModal company={currentCompany} />
                </Modal>
            )}
            {modalType === "delete" && (
                <Modal
                    show={currentCompany}
                    closeModal={() => setCurrentCompany(null)}
                >
                    <CompanyAdminDeleteModal company={currentCompany} closeModal={() => setCurrentCompany(null)} />
                </Modal>
            )}
        </DashboardLayout>
    );
}

export default AdminCompanies;
