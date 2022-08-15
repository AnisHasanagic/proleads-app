import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateUserData,
} from "../../../../store/user/user.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./UserDataModal.scss";

function UserDataModal({ user }: any) {
    const dispatch = useDispatch();

    const users = useSelector((state: any) => state.user);

    const INITIAL_USER = {
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        state: "",
        zip: "",
    };

    const [newUserData, setNewUserData] = useState<any>(INITIAL_USER);
    const [newUserDataErrors, setNewUserDataErrors] = useState<any>({});

    const validations: any = {
        first_name: {
            isRequired: true,
        },
        last_name: {
            isRequired: true,
        },
        phone: {
            isRequired: true,
        },
        address: {
            isRequired: true,
        },
        country: {
            isRequired: true,
        },
        city: {
            isRequired: true,
        },
        state: {
            isRequired: true,
        },
        zip: {
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

        setNewUserData({
            ...newUserData,
            [name]: value,
        });
        if (errors.length > 0)
            setNewUserDataErrors({
                ...newUserDataErrors,
                [name]: errors,
            });
        else
            setNewUserDataErrors({
                ...newUserDataErrors,
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

        setNewUserData({
            ...newUserData,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewUserDataErrors({
                ...newUserDataErrors,
                [name]: errors,
            });
        else
            setNewUserDataErrors({
                ...newUserDataErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newUserDataErrors).some(
            (value: any) => newUserDataErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (user) {
            setNewUserData({
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                address: user.address,
                country: user.country,
                state: user.state,
                city:user.city,
                zip:user.zip
                
            });
            setNewUserDataErrors({});}
        },[user]);

    useEffect(() => {
        if (users.update.errors) {
            setNewUserDataErrors(users.update.errors);
        }
    }, [users.update]);


    return (
        <div id="user-modal">
            <Form className="user-form">
                <Input
                    id={"userFirstName"}
                    type={"text"}
                    name={"first_name"}
                    value={newUserData["first_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["first_name"]}
                    placeholder={"Firstname"}
                />
                <Input
                    id={"userLastName"}
                    type={"text"}
                    name={"last_name"}
                    value={newUserData["last_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["last_name"]}
                    placeholder={"Lastname"}
                />
                <Input
                    id={"userPhone"}
                    type={"text"}
                    name={"phone"}
                    value={newUserData["phone"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["phone"]}
                    placeholder={"Phone number"}
                />
                <Input
                    id={"userAddress"}
                    type={"text"}
                    name={"address"}
                    value={newUserData["address"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["address"]}
                    placeholder={"Address"}
                />
                <Input
                    id={"userCountry"}
                    type={"text"}
                    name={"country"}
                    value={newUserData["country"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["country"]}
                    placeholder={"Country"}
                />
                <Input
                    id={"userState"}
                    type={"text"}
                    name={"state"}
                    value={newUserData["state"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["state"]}
                    placeholder={"State"}
                />
                <Input
                    id={"userCity"}
                    type={"text"}
                    name={"city"}
                    value={newUserData["city"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["city"]}
                    placeholder={"City"}
                />
                <Input
                    id={"userZip"}
                    type={"text"}
                    name={"zip"}
                    value={newUserData["zip"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newUserDataErrors["zip"]}
                    placeholder={"Zip"}
                />
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateUserData(newUserData,user.id))
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

export default UserDataModal;