import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createAccount,
} from "../../../../store/user/user.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./UserAdminModal.scss";

function UserAdminModal({ User, isAdd }: any) {
    const dispatch = useDispatch();

    const Users = useSelector((state: any) => state.users);

    const INITIAL_User = {
        username: "",
        password: "",
        first_name:"",
        last_name:""
    };

    const [newUser, setNewUser] = useState<any>(INITIAL_User);
    const [newUserErrors, setNewUserErrors] = useState<any>({});

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
        if (User) {
            setNewUser({
                username: User.username,
                password: User.password,
                first_name: User.first_name,
                last_name: User.last_name,
            });
            setNewUserErrors({});
        }
    }, [User]);


    useEffect(() => {
        console.log("@2")
        if (Users.update.errors) {
            setNewUserErrors(Users.update.errors);
        }
    }, [Users.update]);

    useEffect(() => {
        if (Users.add.errors) {
            setNewUserErrors(Users.add.errors);
        }
    }, [Users.add]);

    return (
        <div id="User-admin-modal">
            <Form>
                <Input
                    id={"Username"}
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
                    type={"text"}
                    name={"password"}
                    value={newUser["password"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserErrors["password"]}
                    placeholder={"password"}
                    isTextarea
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
                <Checkbox
                    checkItem={(): void =>
                        setNewUser({
                            ...newUser,
                            is_active: !newUser.is_active,
                        })
                    }
                    isChecked={newUser.is_active}
                    disabled={false}
                    label="Is active?"
                />
                <Checkbox
                    checkItem={(): void =>
                        setNewUser({
                            ...newUser,
                            is_archived: !newUser.is_archived,
                        })
                    }
                    isChecked={newUser.is_archived}
                    disabled={false}
                    label="Is archived?"
                />
                
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(createAccount(newUser))}
                        loading={Users.add.loading}
                        disabled={Users.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default UserAdminModal;
