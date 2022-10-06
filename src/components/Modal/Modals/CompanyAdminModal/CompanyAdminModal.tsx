import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    updateCompany,
    addCompany,
} from "../../../../store/company/company.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./CompanyAdminModal.scss";

function CompanyAdminModal({ Company, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const company = useSelector((state: any) => state.company);

    const INITIAL_Company = {
        name: "",
        address: "",
        description: "",
        company_info: "",
        price_per_call:"",
        initial_time:"",
        price_per_minute_overdue: "",
        overdue_time:"",
        company_fields:"",
        is_active: true,
    };

    const [newCompany, setNewCompany] = useState<any>(INITIAL_Company);
    const [newCompanyErrors, setNewCompanyErrors] = useState<any>({});

    const validations: any = {
        name: {
            isRequired: true,
        },
        address: {
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
        initial_time: {
            isRequired: true,
        },
        price_per_minute_overdue: {
            isRequired: true,
        },
        overdue_time: {
            isRequired: true,
        },
        company_fields: {
            isRequired: true,
        },
        is_active: {
            isRequred: true,
            isBoolean: true,
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
            [name]: value ? value.trim() : "",
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

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newCompanyErrors).some(
            (value: any) => newCompanyErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (Company) {
            setNewCompany({
                name: Company.name,
                address: Company.address,
                description: Company.description,
                company_info: Company.company_info,
                price_per_call: Company.price_per_call,
                initial_time: Company.initial_time,
                price_per_minute_overdue: Company.price_per_minute_overdue,
                overdue_time:Company.overdue_time,
                company_fields:Company.company_fields,
                is_active: !!Company.is_active,
            });
            setNewCompanyErrors({});
        }
    }, [Company]);


    useEffect(() => {
        if (company.update.errors) {
            setNewCompanyErrors(company.update.errors);
        }
    }, [company.update]);

    useEffect(() => {
        if (company.add.errors) {
            setNewCompanyErrors(company.add.errors);
        }
    }, [company.add]);

    return (
        <div id="Company-admin-modal">
            <Form>
                <Input
                    id={"name"}
                    type={"text"}
                    name={"name"}
                    value={newCompany["name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["name"]}
                    placeholder={"name"}
                />
                <Input
                    id={"address"}
                    type={"text"}
                    name={"address"}
                    value={newCompany["address"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["address"]}
                    placeholder={"address"}
                />
                <Input
                    id={""}
                    type={"text"}
                    name={"description"}
                    value={newCompany["description"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["description"]}
                    placeholder={"Description"}
                    isTextarea
                />
                <Input
                    id={"company_info"}
                    type={"text"}
                    name={"company_info"}
                    value={newCompany["company_info"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["company_info"]}
                    placeholder={"Company info"}
                    isTextarea
                />
                <Input
                    id={"price_per_call"}
                    type={"number"}
                    name={"price_per_call"}
                    value={newCompany["price_per_call"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["price_per_call"]}
                    placeholder={"price_per_call in euros"}
                />
                <Input
                    id={"initial_time"}
                    type={"number"}
                    name={"initial_time"}
                    value={newCompany["initial_time"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["initial_time"]}
                    placeholder={"initial_time in seconds"}
                />
                <Input
                    id={"price_per_minutes_overdue"}
                    type={"number"}
                    name={"price_per_minutes_overdue"}
                    value={newCompany["price_per_minutes_overdue"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["price_per_minutes_overdue"]}
                    placeholder={"price_per_minutes_overdue in euros"}
                />
                <Input
                    id={"overdue_time"}
                    type={"number"}
                    name={"overdue_time"}
                    value={newCompany["overdue_time"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["overdue_time"]}
                    placeholder={"overdue_time in seconds"}
                />
                <Input
                    id={"company_fields"}
                    type={"text"}
                    name={"company_fields"}
                    value={newCompany["company_fields"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["company_fields"]}
                    placeholder={"company_fields"}
                    isTextarea
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateCompany(newCompany, Company.id))
                        }
                        loading={company.update.loading}
                        disabled={company.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addCompany(newCompany,navigate))}
                        loading={company.add.loading}
                        disabled={company.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default CompanyAdminModal;