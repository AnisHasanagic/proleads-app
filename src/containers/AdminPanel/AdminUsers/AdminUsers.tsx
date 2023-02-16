import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../components/Modal/Modal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import UserAdminModal from "../../../components/Modal/Modals/UserAdminModal/UserAdminModal";
import { loadUsers } from "../../../store/users/users.actions";
import "./AdminUsers.scss";
import { Input } from "../../../components/Input/Input";
import { Button, ButtonTypes } from "../../../components/Button/Button";

import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import PasswordIcon from "@mui/icons-material/PasswordRounded";
import ChangePasswordModal from "../../../components/Modal/Modals/ChangePasswordModal/ChangePasswordModal";

function AdminUsers() {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);
    const [isPassword, setIsPassword] = useState<any>(false);

    const users = useSelector((state: any) => state.users);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(() => {
        setCurrentUser(null);
    }, [users.list]);

    const editUser = (user: any) => {
        setIsAdd(false);
        setIsPassword(false);
        setCurrentUser(user);
    };

    const changePassword = (user: any) => {
        setIsAdd(false);
        setIsPassword(true);
        setCurrentUser(user);
    };

    const actions = [
        {
            row: "edit_user",
            icon: <EditIcon />,
            action: editUser,
        },
        {
            row: "change_password",
            icon: <PasswordIcon />,
            action: changePassword,
        },
    ];

    const columnsToShow = ["username", "full_name", "role", "isDeleted"];

    const keys = columnsToShow;
    const search = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) => item[key].toString().toLowerCase().includes(searchValue))
        );
    };
    return (
        <DashboardLayout>
            <section id="admin-users">
                <div className="page-title">
                    <div className="title">
                        <h1>Gebruikers</h1>
                        <p>{users.list.length} inzendingen gevonden</p>
                    </div>
                    <div className="actions">
                        <Button
                            btnClass={ButtonTypes.primary}
                            className="add-button"
                            customClass="ml-auto"
                            onClick={() => {
                                setIsAdd(true);
                                setIsPassword(false);
                                setCurrentUser({
                                    username: "",
                                    password: "",
                                    full_name: "",
                                    role: "",
                                });
                            }}
                        >
                            + Voeg een nieuw item toe
                        </Button>
                    </div>
                </div>
                <div className="search-butt">
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void =>
                            setSearchValue(e.target.value)
                        }
                        prepend={<SearchIcon />}
                        placeholder={"Zoekopdracht..."}
                    />
                </div>
                <Table
                    data={search(users.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            <Modal
                show={currentUser && !isPassword}
                closeModal={() => setCurrentUser(null)}
            >
                <UserAdminModal user={currentUser} isAdd={isAdd} />
            </Modal>
            <Modal
                show={currentUser && isPassword}
                closeModal={() => setCurrentUser(null)}
            >
                <ChangePasswordModal user={currentUser} />
            </Modal>
        </DashboardLayout>
    );
}
export default AdminUsers;
