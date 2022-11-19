import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    updateCompany,
    addCompany,
} from "../../../../store/company/company.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { loadUsers } from "../../../../store/users/users.actions"
import { loadAssignedUsers } from "../../../../store/assignedUsers/assignedUsers.actions";
import { loadUnAssignedUsers } from "../../../../store/unassignedUsers/unassignedUsers.actions";
import Table from "../../../Table/Table";

import "./AssignModal.scss";
import { isNullishCoalesce } from "typescript";
import { addAssign } from "../../../../store/assign/assign.actions";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


function AssignModal({ company, isAdd }: any) {


    const dispatch = useDispatch();
    const navigate = useNavigate()
    const users = useSelector((state: any) => state.users);
    const [searchValue, setSearchValue] = useState("")
    const assigned = useSelector((state: any) => state.assigned)
    const unassigned = useSelector((state: any) => state.unAssigned)

    useEffect(() => {
        dispatch(loadAssignedUsers(company.id))
    }, [])

    useEffect(() => {
        dispatch(loadUnAssignedUsers(company.id))
    }, [])

    const showUser = (user: any) => {
        dispatch(addAssign({ company_id: company.id, user_id: user.id }, navigate))
    };

    const actions1 = [
        {
            name: "Assign",
            row: "id",
            icon: <AssignmentIndIcon />,
            action: showUser,
        },
    ];

    const actions2 = [
        {
            name: "UnAssign",
            row: "id",
            icon: <AssignmentIndIcon />,
            action: showUser,
        },
    ];

    const columnsToShow = [
        "username",
    ];

    const keys = columnsToShow
    const search = (data: any) => {
        return data.filter(
            (item: any) =>
                keys.some(key => item[key].toLowerCase().includes(searchValue)))
    }

    return (
        <section id="assign-users">
            <div>
                <h1>All Users</h1>
                <p className="mb-5">List of all users.</p>
            </div>
            <div className="flex">
                <div className="assign">
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void => setSearchValue(e.target.value)}
                        placeholder={"Search..."}
                    />
                    <Table
                        data={search(unassigned.list)}
                        actions={actions1}
                        columnsToShow={columnsToShow}
                    />
                </div>
                <div className="unassign">
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void => setSearchValue(e.target.value)}
                        placeholder={"Search..."}
                    />
                    <Table
                        data={search(assigned.list)}
                        actions={actions2}
                        columnsToShow={columnsToShow}
                    />
                </div>
            </div>
        </section>
    );
};

export default AssignModal;