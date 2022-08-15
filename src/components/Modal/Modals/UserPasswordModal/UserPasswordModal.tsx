import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateUserPassword,
} from "../../../../store/user/user.actions";
import { strongPassword } from "../../../../utils/helpers";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./UserPasswordModal.scss";

function UserPasswordModal({ user }: any) {
    const dispatch = useDispatch();

    const users = useSelector((state: any) => state.user);

    const INITIAL_USER = {
        password:""
    };

    const [newUserPassword, setNewUserPassword] = useState<any>(INITIAL_USER);
    const [newUserPasswordErrors, setNewUserPasswordErrors] = useState<any>({});

    const validations: any = {
        current_password:{
        isRequired:true,
        },
        password: {
            isRequired: true,
        },
        passwordRepeat: {
            isRequired: true,
            sameAs: "password",
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

        setNewUserPassword({
            ...newUserPassword,
            [name]: value,
        });
        if (errors.length > 0)
            setNewUserPasswordErrors({
                ...newUserPasswordErrors,
                [name]: errors,
            });
        else
            setNewUserPasswordErrors({
                ...newUserPasswordErrors,
                [name]: [],
            });
    };

    const blurEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;


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

                if (validator.isStrongPassword && id === "userNewPassword") {
                    if (!strongPassword(value)) {
                        errors.push(
                            "Requires 1 digit, 1 lowercase, 1 uppercase character and 8 characters long."
                        );
                    }
                }
    
                if (validator.sameAs && id === "joinRepeatPassword") {
                    if (value !== newUserPassword[validator.sameAs]) {
                        errors.push("Does not match.");
                    }
                }
            }
        }

        setNewUserPassword({
            ...newUserPassword,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewUserPasswordErrors({
                ...newUserPasswordErrors,
                [name]: errors,
            });
        else
            setNewUserPasswordErrors({
                ...newUserPasswordErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newUserPasswordErrors).some(
            (value: any) => newUserPasswordErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (user) {
            setNewUserPassword({
                new_password: user.password, 
            });
            setNewUserPasswordErrors({});}
        },[user]);

    useEffect(() => {
        if (users.update.errors) {
            setNewUserPasswordErrors(users.update.errors);
        }
    }, [users.update]);
    console.log(newUserPassword)

    return (
        <div id="user-modal">
            <Form>
                <Input
                    id={"userCurrentPassword"}
                    type={"password"}
                    name={"current_password"}
                    value={newUserPassword["current_password"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserPasswordErrors["current_password"]}
                    placeholder={"Current password"}
                />
                <Input
                    id={"userNewPassword"}
                    type={"password"}
                    name={"new_password"}
                    value={newUserPassword["new_password"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserPasswordErrors["new_password"]}
                    placeholder={"New password"}
                />
                <Input
                    id={"joinRepeatPassword"}
                    type={"password"}
                    name={"repeat_password"}
                    value={newUserPassword["repeat_password"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserPasswordErrors["repeat_password"]}
                    placeholder={"Repeat new password"}
                />
               
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateUserPassword(newUserPassword,user.id))
                        }
                        loading={users.update.loading}
                        disabled={users.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                
               
            </Form>
        </div>
    );
}

export default UserPasswordModal;