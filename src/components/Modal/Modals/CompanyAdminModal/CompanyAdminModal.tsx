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
import CTBFields from "../../../../assets/CTBFields.svg"


import "./CompanyAdminModal.scss";

function CompanyAdminModal({ company, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const company_state = useSelector((state: any) => state.company);
    const user = useSelector((state: any) => state.user)


    const INITIAL_Company = {
        name: "",
        address: "",
        emial: "",
        description: "",
        company_info: "",
        price_per_call: "",
        initial_time: "",
        price_per_minutes_overdue: "",
        overdue_time: "",
        company_fields: "",
        isDeleted: ""
    };

    const [inputList, setInputList] = useState<any>([])
    const [newCompany, setNewCompany] = useState<any>(INITIAL_Company);
    const [newCompanyErrors, setNewCompanyErrors] = useState<any>({});
    const [isDeleted, setIsDeleted] = useState<any>(false)

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
        }
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
        let temp = value
        temp = temp ? temp.trim() : ""
        temp = temp.toLowerCase();
        temp = temp.replace(/ /g, "_")
        return temp
    }

    let beutifyString = (value: any) => {
        let temp = value.toString()
        temp = temp.replace(/_+/g, ' ')
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp
    }

    const changeInputEvent = (e: any, index: any): void => {
        const name = e.target.name;
        let value = e.target.value;
        let list = [...inputList]



        list = [
            ...list.slice(0, index),
            {
                [value]: ""
            },
            ...list.slice(index + 1)
        ]

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

        setInputList(
            list
        );


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
        let list = [...inputList]

        value = valueToLowerCase(value)
        console.log(value)

        list = [
            ...list.slice(0, index),
            {
                [value]: ""
            },
            ...list.slice(index + 1)
        ]

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
                email: company.email,
                description: company.description,
                company_info: company.company_info,
                price_per_call: company.price_per_call,
                initial_time: company.initial_time,
                price_per_minutes_overdue: company.price_per_minutes_overdue,
                overdue_time: company.overdue_time,
                company_fields: company.company_fields,
                isDeleted: company.isDeleted,
            });
            setNewCompanyErrors({});
            setInputList(JSON.parse(company.company_fields))
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
                <img src={CTBFields}
                    className="add-image"
                    alt="" />
                <h2>Add Company</h2>
            </div>
            <div className="forma">
                <Form className="form">
                    <div>
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
                            id={"email"}
                            type={"text"}
                            name={"email"}
                            value={newCompany["email"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newCompanyErrors["email"]}
                            placeholder={"email"}
                        />
                        <Input
                            id={"description"}
                            type={"text"}
                            name={"description"}
                            value={newCompany["description"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newCompanyErrors["description"]}
                            placeholder={"Description"}
                            isTextarea
                        />
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                        {!isAdd && (
                            <Checkbox
                                checkItem={(): void =>
                                    setNewCompany({
                                        ...newCompany,
                                        isDeleted: !newCompany.isDeleted
                                    })
                                }
                                isChecked={newCompany.isDeleted}
                                disabled={false}

                                label="Do you want to soft delete this?"
                            >
                            </Checkbox>
                        )}


                        {isAdd && (
                            inputList.map((field: any, i: any) => {
                                return (<div key={i}>
                                    <Input
                                        id={"company_field" + i}
                                        name={"company_field" + i}
                                        type={"text"}
                                        value={beutifyString(Object.keys(field)[0])}
                                        onChange={(e: any): void => changeInputEvent(e, i)}
                                        onBlur={(e: any): void => blurInputEvent(e, i)}
                                        placeholder={"Company field"}
                                    />

                                    {inputList.length !== 0 && <Button
                                        className="mr10"
                                        onClick={() => handleRemoveClick(i)}>Remove</Button>}

                                </div>)
                            })
                        )}


                        {!isAdd && (
                            inputList.map((field: any, i: any) => {
                                return (<div key={i}>
                                    <Input
                                        id={"company_field" + i}
                                        name={"company_field" + i}
                                        type={"text"}
                                        value={beutifyString(Object.keys(field)[0])}
                                        onChange={(e: any): void => changeInputEvent(e, i)}
                                        onBlur={(e: any): void => blurInputEvent(e, i)}
                                        placeholder={"Company field"}
                                    />

                                    {inputList.length !== 1 && (<Button
                                        className="btn"
                                        onClick={() => handleRemoveClick(i)}
                                        btnClass={ButtonTypes.primary}
                                    >Remove</Button>)}

                                </div>)
                            })
                        )}
                        <div className="addBtn">
                            <Button onClick={handleAddClick}
                                btnClass={ButtonTypes.primary}

                            >Add</Button>
                        </div>
                    </div>

                </Form>
            </div>


            <div className="butt">
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateCompany({ ...newCompany, company_fields: JSON.stringify(inputList) }, company.id, user.id, navigate))
                        }
                        loading={company_state.update.loading}
                        disabled={company_state.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addCompany({ ...newCompany, company_fields: JSON.stringify(inputList), isDeleted: isDeleted }, user.id, navigate))}
                        loading={company_state.add.loading}
                        disabled={company_state.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </div>

        </div>
    );
}

export default CompanyAdminModal;