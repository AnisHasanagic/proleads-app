import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    updateCompany,
    addCompany,
} from "../../../../store/company/company.actions";
import {
    addCall
}from "../../../../store/call/call.actions"
import companySlice from "../../../../store/company/company.slice";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./CallModal.scss";

function CallModal({ call,companys, isAdd }: any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const company = useSelector((state: any) => state.company);
    
    const INITIAL_Call = {
        price_per_call:"",
        initial_time:"",
        price_per_minute_overdue: "",
        overdue_time:"",
        call_fields:"",
    };

    const [inputList, setInputList] = useState<any>([{call_field: ""}])
    const [newCall, setNewCall] = useState<any>(INITIAL_Call);
    const [newCallErrors, setNewCallErrors] = useState<any>({});

    const validations: any = {
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
        call_fields: {
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

        setNewCall({
            ...newCall,
            [name]: value,
        });
        if (errors.length > 0)
            setNewCallErrors({
                ...newCallErrors,
                [name]: errors,
            });
        else
            setNewCallErrors({
                ...newCallErrors,
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

        setNewCall({
            ...newCall,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewCallErrors({
                ...newCallErrors,
                [name]: errors,
            });
        else
            setNewCallErrors({
                ...newCallErrors,
                [name]: [],
            });
    };
    const changeInputEvent = (e: any,index:any): void => {
        const name = e.target.name;
        const value = e.target.value;
        const list = [...inputList]
        list[index][name] = value

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

        setInputList({
            list
        });
        if (errors.length > 0)
            setNewCallErrors({
                ...newCallErrors,
                [name]: errors,
            });
        else
            setNewCallErrors({
                ...newCallErrors,
                [name]: [],
            });
    };

    const blurInputEvent = (e:any,index:any): void => {
        const name = e.target.name;
        const value = e.target.value;
        const list = [...inputList]
        list[index][name] = value
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

        setInputList({
            list
        });

        if (errors.length > 0)
            setNewCallErrors({
                ...newCallErrors,
                [name]: errors,
            });
        else
            setNewCallErrors({
                ...newCallErrors,
                [name]: [],
            });
    };
    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newCallErrors).some(
            (value: any) => newCallErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (companys) {
            setNewCall({
                price_per_call: companys.price_per_call,
                initial_time: companys.initial_time,
                price_per_minutes_overdue: companys.price_per_minutes_overdue,
                overdue_time:companys.overdue_time,
                call_fields:companys.call_fields,
            });
            setNewCallErrors({});
        }
    }, [companys]);


    useEffect(() => {
        if (company.update.errors) {
            setNewCallErrors(company.update.errors);
        }
    }, [company.update]);

    useEffect(() => {
        if (company.add.errors) {
            setNewCallErrors(company.add.errors);
        }
    }, [company.add]);

    const handleRemoveClick = (index:any) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
       
    
      const handleAddClick = () => {
        setInputList([...inputList, { company_field: ""}]);
      };
    return (
        <div id="call-admin-modal">
            <div id="info">
                <div id="company_info">{company.company_info}</div>
                <div id="description">{company.description}</div>
                <div id="address">{company.address}</div>
                <div id="name">{company.name}</div>
            </div>
            <Form>
                <Input
                    id={"price_per_call"}
                    type={"number"}
                    name={"price_per_call"}
                    value={newCall["price_per_call"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["price_per_call"]}
                    placeholder={"price_per_call in euros"}
                />
                <Input
                    id={"initial_time"}
                    type={"number"}
                    name={"initial_time"}
                    value={newCall["initial_time"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["initial_time"]}
                    placeholder={"initial_time in seconds"}
                />
                <Input
                    id={"price_per_minutes_overdue"}
                    type={"number"}
                    name={"price_per_minutes_overdue"}
                    value={newCall["price_per_minutes_overdue"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["price_per_minutes_overdue"]}
                    placeholder={"price_per_minutes_overdue in euros"}
                />
                <Input
                    id={"overdue_time"}
                    type={"number"}
                    name={"overdue_time"}
                    value={newCall["overdue_time"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["overdue_time"]}
                    placeholder={"overdue_time in seconds"}
                />
               
                {inputList.map((field:any,i:any)=> {
                <div key={i}>
                 <Input 
                id={"call_field"}
                name={"call_field"}
                type={"text"}
                value={field.company_field}
                onChange={(e: any,i:any): void => changeInputEvent(e,i)}
                onBlur={(e: any,i :any): void => blurInputEvent(e,i)}
                placeholder={"call field"}
                 />

                 {inputList.length !== 1 && <Button
                    className="mr10"
                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                  
                  </div>
                })}
                <Button onClick={handleAddClick}>Add</Button>
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addCall(newCall,navigate))}
                        loading={call.add.loading}
                        disabled={call.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default CallModal;