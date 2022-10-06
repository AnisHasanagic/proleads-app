import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../components/Modal/Modal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import UserAdminModal from "../../../components/Modal/Modals/UserAdminModal/UserAdminModal"
import { loadUsers } from "../../../store/users/users.actions";
import "./AdminUsers.scss";

import{ Button, ButtonTypes } from "../../../components/Button/Button"

function AdminUsers() {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);
    
    const users = useSelector((state: any) => state.users);
     
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const showUser = (user: any) => {
        setIsAdd(false);
        setCurrentUser(user);
    };

    const actions = [
        {
            name: "Edit",
            row: "id",
            text: "Edit",
            action: showUser,
        },
    ];

    const columnsToShow = [
        "id",
        "username",
        "password",
        "first_name",
        "last_name",
        "role",
        "created_at",
        "updated_at",
    ];


    return (
        <DashboardLayout>
            <section id="admin-users">
                <div>
                <h1>All Users</h1>
                <p className="mb-5">List of all users.</p>
                </div>
                <Button
                        btnClass={ButtonTypes.primary}
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
                <Table
                    data={users.list}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            <Modal show={currentUser} closeModal={() => setCurrentUser(null)}>
                <UserAdminModal user={currentUser} isAdd={isAdd}/>
            </Modal>
        </DashboardLayout>
    );
    };
export default AdminUsers;