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
import Table from "../../../Table/Table";

import "./AssignModal.scss";
import { isNullishCoalesce } from "typescript";
import { addAssign } from "../../../../store/assign/assign.actions";


function AssignModal({ company, isAdd }: any) {


    const dispatch = useDispatch();
    const navigate = useNavigate()
    const users = useSelector((state: any) => state.users);
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const showUser = (user: any) => {
        dispatch(addAssign({ company_id: company.id, user_id: user.id }, navigate))
    };

    const actions = [
        {
            name: "Assign",
            row: "id",
            text: "Assign",
            action: showUser,
        },
    ];

    const columnsToShow = [
        "username",
        "first_name",
        "last_name",
        "role"
    ];

    const keys = columnsToShow
    const search = (data: any) => {
        return data.filter(
            (item: any) =>
                keys.some(key => item[key].toLowerCase().includes(searchValue)))
    }

    return (
        <section id="admin-users">
            <div>
                <h1>All Users</h1>
                <p className="mb-5">List of all users.</p>
            </div>
            <Input
                id={"search"}
                type={"text"}
                className={"search"}
                onChange={(e: any): void => setSearchValue(e.target.value)}
                placeholder={"Search..."}
            />
            <Table
                data={search(users.list)}
                actions={actions}
                columnsToShow={columnsToShow}
            />
        </section>
    );
};

export default AssignModal;