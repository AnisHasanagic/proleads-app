import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createAccount,
    updateAccount
} from "../../../../store/users/users.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./UserAdminModal.scss";

function UserAdminModal({ user, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state: any) => state.users);

    const INITIAL_User = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "",
        isDeleted: ""
    };

    const [newUser, setNewUser] = useState<any>(INITIAL_User);
    const [newUserErrors, setNewUserErrors] = useState<any>({});
    const [isDeleted, setIsDeleted] = useState<any>(false)


    const validations: any = {
        username: {
            isRequired: true,
        },
        password: {
            isRequired: true,
        },
        first_name: {
            isRequired: true,
        },
        last_name: {
            isRequired: true,
        },

    };

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewUser({
            ...newUser,
            [name]: value,
        });
        if (errors.length > 0)
            setNewUserErrors({
                ...newUserErrors,
                [name]: errors,
            });
        else
            setNewUserErrors({
                ...newUserErrors,
                [name]: [],
            });
    };

    const blurEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewUser({
            ...newUser,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewUserErrors({
                ...newUserErrors,
                [name]: errors,
            });
        else
            setNewUserErrors({
                ...newUserErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newUserErrors).some(
            (value: any) => newUserErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (user) {
            setNewUser({
                username: user.username,
                password: user.password,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                isDeleted: user.isDeleted
            });
            setNewUserErrors({});
        }
    }, [user]);


    useEffect(() => {
        if (users.update.errors) {
            setNewUserErrors(users.update.errors);
        }
    }, [users.update]);

    useEffect(() => {
        if (users.add.errors) {
            setNewUserErrors(users.add.errors);
        }
    }, [users.add]);

    const createUser = (): void => {
        dispatch(
            createAccount(newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.role, isDeleted, navigate)
        );
    };

    return (
        <div id="User-admin-modal">
            <Form>
                <Input
                    id={"username"}
                    type={"text"}
                    name={"username"}
                    value={newUser["username"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["username"]}
                    placeholder={"username"}
                />
                <Input
                    id={"password"}
                    type={"password"}
                    name={"password"}
                    value={newUser["password"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["password"]}
                    placeholder={"password"}
                />
                <Input
                    id={"first_name"}
                    type={"text"}
                    name={"first_name"}
                    value={newUser["first_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["first_name"]}
                    placeholder={"first_name"}
                />
                <Input
                    id={"last_name"}
                    type={"text"}
                    name={"last_name"}
                    value={newUser["last_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["last_name"]}
                    placeholder={"last_name"}
                />
                <Input
                    id={"role"}
                    type={"text"}
                    name={"role"}
                    value={newUser["role"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["role"]}
                    placeholder={"role"}
                />
                <Checkbox
                    checkItem={() =>
                        setNewUser({
                            ...newUser,
                            isDeleted:!newUser.isDeleted
                        })
                    }
                    isChecked={newUser.isDeleted}
                    disabled={false}
                    label="Do you want to soft delete this?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateAccount(newUser, user.id, navigate))
                        }
                        loading={users.update.loading}
                        disabled={users.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => createUser()}
                        loading={users.add.loading}
                        disabled={users.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default UserAdminModal;
