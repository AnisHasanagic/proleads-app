import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../components/Modal/Modal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import UserAdminModal from "../../../components/Modal/Modals/UserAdminModal/UserAdminModal"
import { loadUsers } from "../../../store/users/users.actions";
import "./AdminUsers.scss";
import { Input } from "../../../components/Input/Input";
import { Button, ButtonTypes } from "../../../components/Button/Button"

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function AdminUsers() {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);

    const users = useSelector((state: any) => state.users);
    const [searchValue, setSearchValue] = useState("")
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(()=>{
        setCurrentUser(null)
    },[users.list])

    const showUser = (user: any) => {
        setIsAdd(false);
        setCurrentUser(user);
    };

    const actions = [
        {
            row: "id",
            icon: <EditIcon />,
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
        <DashboardLayout>
            <section id="admin-users">
                <div>
                    <h1>All Users</h1>
                    <p className="mb-5">List of all users.</p>
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
                        className="add-button"
                        customClass="ml-auto"
                        onClick={() => {
                            setIsAdd(true);
                            setCurrentUser({
                                username: "",
                                password: "",
                                first_name: "",
                                last_name: "",
                                role: ""
                            });
                        }}
                    >
                        Add New
                    </Button>
                </div>
                <Table
                    data={search(users.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            <Modal show={currentUser} closeModal={() => setCurrentUser(null)}>
                <UserAdminModal user={currentUser} isAdd={isAdd} />
            </Modal>
        </DashboardLayout>
    );
};
export default AdminUsers;