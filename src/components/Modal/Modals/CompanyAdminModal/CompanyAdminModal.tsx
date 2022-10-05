import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                    id={"Companyname"}
                    type={"text"}
                    name={"name"}
                    value={newCompany["name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["name"]}
                    placeholder={"name"}
                />
                <Input
                    id={"CompanyDesc"}
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
                    id={"CompanyLink"}
                    type={"text"}
                    name={"link"}
                    value={newCompany["link"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["link"]}
                    placeholder={"Zoom Link"}
                />
                <Input
                    id={"companytartsAt"}
                    type={"datetime-local"}
                    name={"starts_at"}
                    value={newCompany["starts_at"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCompanyErrors["starts_at"]}
                    placeholder={"Starts At"}
                />
                <Checkbox
                    checkItem={(): void =>
                        setNewCompany({
                            ...newCompany,
                            is_active: !newCompany.is_active,
                        })
                    }
                    isChecked={newCompany.is_active}
                    disabled={false}
                    label="Is active?"
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
                        onClick={() => dispatch(addCompany(newCompany))}
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