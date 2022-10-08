import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addCall
}from "../../../../store/call/call.actions"
import { Button, ButtonTypes } from "../../../Button/Button";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";

import "./CallModal.scss";

function CallModal({ companys, isAdd }: any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const company = useSelector((state: any) => state.company);
    const call = useSelector((state:any)=>state.call)
    let start_time = null



    let getTimestampInSeconds = () => {
        return Math.floor(Date.now() / 1000)
      }
    

   useEffect(()=>{
       start_time=getTimestampInSeconds();
   },[]);


    const INITIAL_Call = {
        company_id:"",
        start_time:"",
        end_time:"",
        price_per_call:"",
        initial_time:"",
        price_per_minutes_overdue: "",
        overdue_time:"",
        call_fields:"",
        first_name:"",
        last_name:"",
        gender:"",
        email:"",
        phone:"",
        country:"",
        city:"" 
    };
    const [inputList, setInputList] = useState<any>([]);
    const [newCall, setNewCall] = useState<any>(INITIAL_Call);
    const [newCallErrors, setNewCallErrors] = useState<any>({});

    const validations: any = {
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
        let value = e.target.value;
        let list = [...inputList]


        list = [
            ...list.slice(0, index),
            {
                [name]: value
            },
            ...list.slice(index + 1)
        ]


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
    };

    const blurInputEvent = (e:any,index:any): void => {
        const name = e.target.name;
        let value = e.target.value;
        let list = [...inputList]

        list = [
            ...list.slice(0, index),
            {
                [name]: value
            },
            ...list.slice(index + 1)
        ]

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
                company_id:companys.id,
                price_per_call: companys.price_per_call,
                initial_time: companys.initial_time,
                price_per_minutes_overdue: companys.price_per_minutes_overdue,
                overdue_time:companys.overdue_time,
            });
            setInputList(JSON.parse(companys.company_fields))
            setNewCallErrors({});
        }


    }, [companys]);


    

    useEffect(() => {
        if (call.add.errors) {
            setNewCallErrors(call.add.errors);
        }
    }, [call.add]);

    const CreateCall=():void => {
        let end_time=getTimestampInSeconds();
        dispatch(addCall({...newCall,call_fields:JSON.stringify(inputList)},navigate))
    };

    
    let beutifyString = (value:any) => {
        let temp = value
        temp = temp.replace(/_+/g, ' ')
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp
    }
    
    return (
        <div id="call-admin-modal">
            <div id="info">
            </div>
            <Form>
            <Input
                    id={"first_name"}
                    type={"text"}
                    name={"first_name"}
                    value={newCall["first_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["first_name"]}
                    placeholder={"first_name"}
                />
                <Input
                    id={"last_name"}
                    type={"text"}
                    name={"last_name"}
                    value={newCall["last_name"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["last_name"]}
                    placeholder={"last_name"}
                />
                <Input
                    id={"gender"}
                    type={"text"}
                    name={"gender"}
                    value={newCall["gender"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["gender"]}
                    placeholder={"gender"}
                />
                <Input
                    id={"email"}
                    type={"text"}
                    name={"email"}
                    value={newCall["email"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["email"]}
                    placeholder={"email"}
                />
                <Input
                    id={"country"}
                    type={"text"}
                    name={"country"}
                    value={newCall["country"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["country"]}
                    placeholder={"country"}
                />
                <Input
                    id={"city"}
                    type={"text"}
                    name={"city"}
                    value={newCall["city"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newCallErrors["city"]}
                    placeholder={"city"}
                />
            {inputList.map((field:any,i:any)=> {
                return (<div key={i}>
                 <Input 
                id={"company_field"+i}
                name={Object.keys(field)[0]}
                type={"text"}
                value={Object.values(field)[0]}
                onChange={(e: any): void => changeInputEvent(e,i)}
                onBlur={(e: any): void => blurInputEvent(e,i)}
                placeholder={"Company field"}
                label={beutifyString(Object.keys(field)[0])}
                 />                  
                  </div>)
                })}
                        {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => CreateCall()}
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