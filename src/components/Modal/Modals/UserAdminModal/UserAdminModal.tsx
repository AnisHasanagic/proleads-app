import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createAccount,
    updateAccount,
} from "../../../../store/users/users.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { useNavigate } from "react-router-dom";

import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";

import ToggleButton from "@mui/lab/ToggleButton";
import CTBFields from "../../../../assets/CTBFields.svg";

import "./UserAdminModal.scss";

function UserAdminModal({ user, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: any) => state.user);
    const users = useSelector((state: any) => state.users);

    const INITIAL_User = {
        username: "",
        full_name: "",
        role: "agent",
        isDeleted: false,
    };

    const [newUser, setNewUser] = useState<any>(INITIAL_User);
    const [newUserErrors, setNewUserErrors] = useState<any>({});

    const validations: any = {
        username: {
            isRequired: true,
        },
        full_name: {
            isRequired: true,
        },
        password: {
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
                        errors.push("Veld is verplicht.");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("Veld is verplicht.");
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
                        errors.push("Veld is verplicht.");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("Veld is verplicht.");
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
        if (user && !isAdd) {
            setNewUser({
                username: user.username,
                full_name: user.full_name,
                role: user.role,
                isDeleted: user.isDeleted,
            });
            setNewUserErrors({});
        } else {
            setNewUser(INITIAL_User);
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

    const handleRole = (e: any, value: any): void => {
        setNewUser({
            ...newUser,
            role: value ? 'admin' : 'agent'
        })
    };

    const createUser = (): void => {
        dispatch(
            createAccount(
                newUser.username,
                newUser.password,
                newUser.full_name,
                newUser.role,
                false,
                navigate
            )
        );
    };

    const updateUser = (): void => {
        dispatch(
            updateAccount({ ...newUser }, user.id, navigate)
        );
    };

    const isCurrentdUser = auth && user && auth.id === user.id;

    return (
        <div id="User-admin-modal">
            <div className="tab">
                <img src={CTBFields} className="add-image" alt="" />
                <h2>{isAdd ? "Voeg gebruiker toe" : "Bewerk gebruiker"}</h2>
            </div>
            <div className="forma">
                <Form className="form">
                    <div className="inp">
                        <h2 className="adm">Gebruikersnaam</h2>
                        <Input
                            id={"username"}
                            type={"text"}
                            name={"username"}
                            value={newUser["username"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["username"]}
                            placeholder={"Gebruikersnaam"}
                        />
                        <h2 className="adm">Voor-en</h2>
                        <Input
                            id={"full_name"}
                            type={"text"}
                            name={"full_name"}
                            value={newUser["full_name"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["full_name"]}
                            placeholder={"Voor-en"}
                        />
                    </div>
                    {!isCurrentdUser && (
                        <div className="inp">
                            {isAdd && (
                                <div>
                                    <h2 className="adm">Wachtwoord</h2>
                                    <Input
                                        id={"password"}
                                        type={"password"}
                                        name={"password"}
                                        value={newUser["password"]}
                                        onChange={(e: any): void =>
                                            changeEvent(e)
                                        }
                                        onBlur={(e: any): void => blurEvent(e)}
                                        errors={newUserErrors["password"]}
                                        placeholder={"Wachtwoord"}
                                    />
                                </div>
                            )}

                            <h2 className="adm">Beheerder?</h2>
                            <div className="toggle">
                                <ToggleButtonGroup
                                    id="role"
                                    onChange={handleRole}
                                    value={newUser.role === 'admin'}
                                    aria-label="Is Admin?"
                                    color="success"
                                    exclusive
                                >
                                    <ToggleButton
                                        className="tglbtn"
                                        color="success"
                                        value={false}
                                        aria-label="false"
                                    >
                                        Nee
                                    </ToggleButton>
                                    <ToggleButton
                                        className="tglbtn"
                                        color="success"
                                        value={true}
                                        aria-label="true"
                                    >
                                        Ja
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <p className="desc">
                                Door een gebruiker admin te maken krijgt hij volledige toegang tot de app.
                            </p>
                            <br />
                            {!isAdd && (
                                <>
                                    <h2 className="adm">Actief?</h2>
                                    <div className="toggle">
                                        <ToggleButtonGroup
                                            id="role"
                                            onChange={(e, value) => {
                                                setNewUser({
                                                    ...newUser,
                                                    isDeleted: !value,
                                                });
                                            }}
                                            value={!newUser.isDeleted}
                                            aria-label="Is Active?"
                                            color="success"
                                            exclusive
                                        >
                                            <ToggleButton
                                                className="tglbtn"
                                                color="success"
                                                value={false}
                                                aria-label="false"
                                            >
                                                Nee
                                            </ToggleButton>
                                            <ToggleButton
                                                className="tglbtn"
                                                color="success"
                                                value={true}
                                                aria-label="true"
                                            >
                                                Ja
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    <p className="desc">
                                        Door de gebruiker te deactiveren, doen ze dat niet
                                        in staat zijn om de app te gebruiken totdat u
                                        activeer ze weer.
                                    </p>
                                </>
                                // <Checkbox
                                //     checkItem={() =>
                                //         setNewUser({
                                //             ...newUser,
                                //             isDeleted: !newUser.isDeleted,
                                //         })
                                //     }
                                //     isChecked={newUser.isDeleted}
                                //     disabled={false}
                                //     label="Do you want to soft delete this user?"
                                // />
                            )}
                        </div>
                    )}
                </Form>
            </div>
            <div className="butt">
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => updateUser()}
                        loading={users.update.loading}
                        disabled={users.update.loading || hasSomeErrors()}
                    >
                        Opslaan
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => createUser()}
                        loading={users.add.loading}
                        disabled={users.add.loading || hasSomeErrors()}
                    >
                        Creëren
                    </Button>
                )}
            </div>
        </div>
    );
}

export default UserAdminModal;
