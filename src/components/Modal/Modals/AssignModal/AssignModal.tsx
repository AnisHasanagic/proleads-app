import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    loadAssignedUsers,
    loadUnAssignedUsers,
} from "../../../../store/company/company.actions";
import { Input } from "../../../Input/Input";
import Table from "../../../Table/Table";

import "./AssignModal.scss";
import { toggleAssign } from "../../../../store/assign/assign.actions";
import AssignmentIndIcon from "@mui/icons-material/Add";
import UnAssignmentIndIcon from "@mui/icons-material/Remove";
import CTBFields from "../../../../assets/CTBFields.svg";

function AssignModal({ company }: any) {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [searchValue2, setSearchValue2] = useState("");
    const assigned = useSelector((state: any) => state.company.assigned_users);
    const unassigned = useSelector(
        (state: any) => state.company.unassigned_users
    );

    useEffect(() => {
        if (company) {
            dispatch(loadAssignedUsers(company.id));
            dispatch(loadUnAssignedUsers(company.id));
        }
    }, [company]);

    const toggleAssignUser = (user: any) => {
        dispatch(toggleAssign({ company_id: company.id, user_id: user.id }));
    };

    const actions1 = [
        {
            name: "Assign",
            row: "id",
            icon: <AssignmentIndIcon />,
            action: toggleAssignUser,
        },
    ];

    const actions2 = [
        {
            name: "UnAssign",
            row: "id",
            icon: <UnAssignmentIndIcon />,
            action: toggleAssignUser,
        },
    ];

    const columnsToShow = ["username"];

    const keys = columnsToShow;
    const search = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) => item[key].toLowerCase().includes(searchValue))
        );
    };

    const search2 = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) => item[key].toLowerCase().includes(searchValue2))
        );
    };

    return (
        <section id="assign-users">
            <div className="tab">
                <img src={CTBFields} className="add-image" alt="" />
                <h2>{company && company.name} Assign agent</h2>
            </div>
            <div className="form-new flex">
                <div className="assign">
                    <p>Unassigned agents</p>
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void =>
                            setSearchValue(e.target.value)
                        }
                        placeholder={"Search..."}
                    />
                    <Table
                        data={search(unassigned.list)}
                        actions={actions1}
                        columnsToShow={columnsToShow}
                        hidePagination
                        hideHeaders
                        small
                    />
                </div>
                <div className="unassign">
                    <p>Assigned agents</p>
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void =>
                            setSearchValue2(e.target.value)
                        }
                        placeholder={"Search..."}
                    />
                    <Table
                        data={search2(assigned.list)}
                        actions={actions2}
                        columnsToShow={columnsToShow}
                        hidePagination
                        hideHeaders
                        small
                    />
                </div>
            </div>
        </section>
    );
}

export default AssignModal;
