import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    updateCompany,
    addCompany,
} from "../../../../store/company/company.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import CTBFields from "../../../../assets/CTBFields.svg";

import "./CompanyAdminModal.scss";
import { FormGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

function CompanyAdminModal({ company, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const company_state = useSelector((state: any) => state.company);
    const user = useSelector((state: any) => state.user);

    const INITIAL_Company = {
        name: "",
        address: "",
        email: [],
        description: "",
        phone: "",
        company_info: "",
        price_per_call: "",
        price_per_connect: "",
        initial_time: "",
        price_per_minutes_overdue: "",
        overdue_time: "",
        company_fields: "",
        package_calls: "",
        isDeleted: false,
    };

    const [inputList, setInputList] = useState<any>([]);
    const [newCompany, setNewCompany] = useState<any>(INITIAL_Company);
    const [newCompanyErrors, setNewCompanyErrors] = useState<any>({});

    const validations: any = {
        name: {
            isRequired: true,
        },
        address: {
            isRequired: true,
        },
        email: {
            isRequired: true,
        },
        description: {
            isRequired: true,
        },
        company_info: {
            isRequired: true,
        },
        price_per_call: {
            isRequired: true,
        },
        price_per_connect: {
            isRequired: true,
        },
        initial_time: {
            isRequired: true,
        },
        price_per_minutes_overdue: {
            isRequired: true,
        },
        overdue_time: {
            isRequired: true,
        },
        company_fields: {
            isRequired: true,
        },
        phone: {
            isRequired: true,
        },
        package_calls: {
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

        setNewCompany({
            ...newCompany,
            [name]: value,
        });
        if (errors.length > 0)
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: errors,
            });
        else
            setNewCompanyErrors({
                ...newCompanyErrors,
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

        setNewCompany({
            ...newCompany,
            [name]: value,
        });

        if (errors.length > 0)
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: errors,
            });
        else
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: [],
            });
    };

    let valueToLowerCase = (value: any) => {
        let temp = value;
        temp = temp ? temp.trim() : "";
        temp = temp.toLowerCase();
        temp = temp.replace(/ /g, "_");
        return temp;
    };

    let beutifyString = (value: any) => {
        let temp = value.toString();
        temp = temp.replace(/_+/g, " ");
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp;
    };

    const changeInputEvent = (e: any, index: any): void => {
        const name = e.target.name;
        let value = e.target.value;
        let list = [...inputList];

        list = [
            ...list.slice(0, index),
            {
                [value]: "",
            },
            ...list.slice(index + 1),
        ];

        console.log(list);

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (name !== true || name !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (name.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setInputList(list);

        if (errors.length > 0)
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: errors,
            });
        else
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: [],
            });
    };

    const blurInputEvent = (e: any, index: any): void => {
        const name = e.target.name;
        let value = e.target.value;
        let list = [...inputList];

        value = valueToLowerCase(value);
        console.log(value);

        list = [
            ...list.slice(0, index),
            {
                [value]: "",
            },
            ...list.slice(index + 1),
        ];

        console.log(list);

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (name !== true || name !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (name.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setInputList(list);

        if (errors.length > 0)
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: errors,
            });
        else
            setNewCompanyErrors({
                ...newCompanyErrors,
                [name]: [],
            });
    };
    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newCompanyErrors).some(
            (value: any) => newCompanyErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (company && company.id) {
            setNewCompany({
                name: company.name,
                address: company.address,
                email: company.email.split(','),
                description: company.description,
                company_info: company.company_info,
                price_per_call: company.price_per_call,
                price_per_connect: company.price_per_connect,
                initial_time: company.initial_time,
                price_per_minutes_overdue: company.price_per_minutes_overdue,
                overdue_time: company.overdue_time,
                company_fields: company.company_fields,
                isDeleted: company.isDeleted,
                phone: company.phone,
                package_calls: company.package_calls,
            });
            setNewCompanyErrors({});
            setInputList(JSON.parse(company.company_fields));
        } else {
            setNewCompany(INITIAL_Company);
            setNewCompanyErrors({});
            setInputList([]);
        }
    }, [company]);

    useEffect(() => {
        if (company_state.update.errors) {
            setNewCompanyErrors(company_state.update.errors);
        }
    }, [company_state.update]);

    useEffect(() => {
        if (company_state.add.errors) {
            setNewCompanyErrors(company_state.add.errors);
        }
    }, [company_state.add]);

    const handleRemoveClick = (index: any) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { "": "" }]);
    };

    return (
        <div id="company-admin-modal">
            <div className="tab">
                <img src={CTBFields} className="add-image" alt="" />
                <h2>Bedrijf toevoegen</h2>
            </div>
            <div className="forma">
                <Form className="form">
                    <div className="inp">
                        <FormGroup>
                            <Input
                                id={"name"}
                                type={"text"}
                                name={"name"}
                                value={newCompany["name"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["name"]}
                                placeholder={"Naam"}
                                label={"Naam"}
                            />
                            <Input
                                id={"address"}
                                type={"text"}
                                name={"address"}
                                value={newCompany["address"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["address"]}
                                placeholder={"Adres"}
                                label={"Adres"}
                            />
                            <div className="inputGroup email">
                                <label htmlFor="email">Lijst met e-mails</label>
                                <div className="inputInner">
                                    <ReactMultiEmail
                                        id="email"
                                        placeholder="Emails"
                                        emails={newCompany["email"]}
                                        onChange={(_emails: string[]) => {
                                            setNewCompany({
                                                ...newCompany,
                                                email: _emails,
                                            });
                                        }}
                                        getLabel={(
                                            email,
                                            index,
                                            removeEmail
                                        ) => {
                                            return (
                                                <div data-tag key={index}>
                                                    <div data-tag-item>
                                                        {email}
                                                    </div>
                                                    <span
                                                        data-tag-handle
                                                        onClick={() => removeEmail(index)}
                                                    >
                                                        ×
                                                    </span>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <Input
                                id={"description"}
                                type={"text"}
                                name={"description"}
                                value={newCompany["description"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["description"]}
                                placeholder={"Beschrijving"}
                                label={"Beschrijving"}
                                isTextarea
                            />
                        </FormGroup>
                    </div>
                    <div className="inp">
                        <FormGroup>
                            <Input
                                id={"package_calls"}
                                type={"number"}
                                name={"package_calls"}
                                value={newCompany["package_calls"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["package_calls"]}
                                placeholder={"Maandelijkse pakketoproepen"}
                                label={"Maandelijkse pakketoproepen"}
                            />
                            <Input
                                id={"price_per_call"}
                                type={"number"}
                                name={"price_per_call"}
                                value={newCompany["price_per_call"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["price_per_call"]}
                                placeholder={"Prijs per gesprek"}
                                label={"Prijs per gesprek"}
                            />
                            <Input
                                id={"initial_time"}
                                type={"number"}
                                name={"initial_time"}
                                value={newCompany["initial_time"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["initial_time"]}
                                placeholder={"Initiële beltijd (s)"}
                                label={"Initiële beltijd (s)"}
                            />
                            <Input
                                id={"price_per_minutes_overdue"}
                                type={"number"}
                                name={"price_per_minutes_overdue"}
                                value={newCompany["price_per_minutes_overdue"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={
                                    newCompanyErrors[
                                        "price_per_minutes_overdue"
                                    ]
                                }
                                placeholder={"Achterstallige prijs"}
                                label={"Achterstallige prijs"}
                            />
                            <Input
                                id={"company_info"}
                                type={"text"}
                                name={"company_info"}
                                value={newCompany["company_info"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["company_info"]}
                                placeholder={"Bedrijfsinfo"}
                                label={"Bedrijfsinfo"}
                                isTextarea
                            />
                        </FormGroup>
                    </div>
                    <div className="inp">
                        <FormGroup>
                            <Input
                                id={"overdue_time"}
                                type={"number"}
                                name={"overdue_time"}
                                value={newCompany["overdue_time"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["overdue_time"]}
                                placeholder={"Achterstallige tijd (s)"}
                                label={"Achterstallige tijd (s)"}
                            />
                            <Input
                                id={"price_per_connect"}
                                type={"number"}
                                name={"price_per_connect"}
                                value={newCompany["price_per_connect"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["price_per_connect"]}
                                placeholder={"Prijs per aansluiting"}
                                label={"Prijs per aansluiting"}
                            />
                            <Input
                                id={"phone"}
                                type={"text"}
                                name={"phone"}
                                value={newCompany["phone"]}
                                onChange={(e: any): void => changeEvent(e)}
                                onBlur={(e: any): void => blurEvent(e)}
                                errors={newCompanyErrors["phone"]}
                                placeholder={"Proleads telefoon"}
                                label={"Proleads telefoon"}
                            />
                        </FormGroup>
                        <p className="title-custom">
                            Aangepaste velden (specifiek voor bedrijf)
                        </p>
                        <div id="custom-fileds">
                            <div className="custom">
                                {isAdd &&
                                    inputList.map((field: any, i: any) => {
                                        return (
                                            <div key={i}>
                                                <Input
                                                    id={"company_field" + i}
                                                    name={"company_field" + i}
                                                    type={"text"}
                                                    value={beutifyString(
                                                        Object.keys(field)[0]
                                                    )}
                                                    onChange={(e: any): void =>
                                                        changeInputEvent(e, i)
                                                    }
                                                    onBlur={(e: any): void =>
                                                        blurInputEvent(e, i)
                                                    }
                                                    placeholder={
                                                        "Aangepast veld (bijv. bootmaat)"
                                                    }
                                                />

                                                {inputList.length !== 0 && (
                                                    <Button
                                                        className="ml10"
                                                        onClick={() =>
                                                            handleRemoveClick(i)
                                                        }
                                                        btnClass={
                                                            ButtonTypes.danger
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faRemove}
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    })}

                                {!isAdd &&
                                    inputList.map((field: any, i: any) => {
                                        return (
                                            <div key={i}>
                                                <Input
                                                    id={"company_field" + i}
                                                    name={"company_field" + i}
                                                    type={"text"}
                                                    value={beutifyString(
                                                        Object.keys(field)[0]
                                                    )}
                                                    onChange={(e: any): void =>
                                                        changeInputEvent(e, i)
                                                    }
                                                    onBlur={(e: any): void =>
                                                        blurInputEvent(e, i)
                                                    }
                                                    placeholder={
                                                        "Aangepast veld (bijv. bootmaat)"
                                                    }
                                                />

                                                {inputList.length !== 0 && (
                                                    <Button
                                                        className="btn"
                                                        onClick={() =>
                                                            handleRemoveClick(i)
                                                        }
                                                        btnClass={
                                                            ButtonTypes.danger
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faRemove}
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                            <Button
                                onClick={handleAddClick}
                                btnClass={ButtonTypes.primary}
                                large
                            >
                                Aangepast veld toevoegen
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>

            <div className="butt">
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(
                                updateCompany(
                                    {
                                        ...newCompany,
                                        email: newCompany.email.join(','),
                                        company_fields:
                                            JSON.stringify(inputList),
                                    },
                                    company.id
                                )
                            )
                        }
                        loading={company_state.update.loading}
                        disabled={
                            company_state.update.loading || hasSomeErrors()
                        }
                    >
                        Redden
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(
                                addCompany({
                                    ...newCompany,
                                    email: newCompany.email.join(','),
                                    company_fields: JSON.stringify(inputList),
                                })
                            )
                        }
                        loading={company_state.add.loading}
                        disabled={company_state.add.loading || hasSomeErrors()}
                    >
                        Creëren
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CompanyAdminModal;
