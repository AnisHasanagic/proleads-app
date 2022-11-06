import moment from "moment";
import { strongPassword } from "../../../../utils/helpers";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createAccount,
    updateAccount,
    updatePassword
} from "../../../../store/users/users.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ToggleButton from '@material-ui/lab/ToggleButton';
import CTBFields from "../../../../assets/CTBFields.svg"

import "./ChangePasswordModal.scss";

function ChangePasswordModal({ user }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state: any) => state.users);
    const [currentUser, setCurrentUser] = useState<any>(null);


    const INITIAL_USER = {
        password: "",
    };

    const [newUserPassword, setNewUserPassword] = useState<any>(INITIAL_USER);
    const [newUserPasswordErrors, setNewUserPasswordErrors] = useState<any>({});


    const validations: any = {
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
                        errors.push("REQUIRED_PASSWORD_STRONG");
                    }
                }

                if (validator.sameAs && id === "joinRepeatPassword") {
                    if (value !== newUserPassword[validator.sameAs]) {
                        errors.push("PASSWORD_DO_NOT_MATCH");
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




    return (
        <div id="User-password-modal">
            <div className="tab">
                <h2 className="header">Change Password</h2>
            </div>
            <div className="forma">
                <Form className="form">

                    <div className="inp">
                        <div>
                            <h2 className="adm">New Password</h2>
                            <Input
                                id={"Newpassword"}
                                type={"password"}
                                name={"new_password"}
                                value={newUserPassword["new_password"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newUserPasswordErrors["new_password"]}
                                placeholder={"New Password"}
                            />
                            <h2 className="adm">Repeat Password</h2>
                            <Input
                                id={"Repeatpassword"}
                                type={"password"}
                                name={"repeat_password"}
                                value={newUserPassword["repeat_password"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newUserPasswordErrors["repeat_password"]}
                                placeholder={"Repeat Password"}
                            />
                        </div>


                    </div>
                </Form>
            </div>
            <div className="butt">
                <Button
                    btnClass={ButtonTypes.primary}
                    onClick={() => dispatch(updatePassword(newUserPassword, user.id, navigate))}
                    loading={users.update.loading}
                    disabled={users.update.loading || hasSomeErrors()}
                >
                    Save
                </Button>
            </div>
        </div>

    );
}

export default ChangePasswordModal;