import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    addCall,
    mailSend
} from "../../store/call/call.actions"
import { Button, ButtonTypes } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import "./CallPage.scss";
import { loadCompany } from "../../store/detail/detail.actions";
import DashboardLayout from "../../layouts/DashboardLayout";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ToggleButton from '@material-ui/lab/ToggleButton';
import { setSourceMapRange } from "typescript";

function CallPage() {


    const { id }: any = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companys = useSelector((state: any) => state.company);
    const detail = useSelector((state: any) => state.detail)
    const call = useSelector((state: any) => state.call)
    const users = useSelector((state: any) => state.user)
    const [sendMail, setSendMail] = useState(false)
    const [gender, setGender] = useState("")
    const [mr, setMr] = useState("")




    let getTimestampInSeconds = () => {
        return Math.floor(Date.now() / 1000)
    }


    useEffect(() => {
        dispatch(loadCompany(id))
    }, [])


    const INITIAL_Call = {
        company_id: "",
        user_id: "",
        start_time: "",
        end_time: "",
        price_per_call: "",
        initial_time: "",
        price_per_minutes_overdue: "",
        overdue_time: "",
        call_fields: "",
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        start_timer: "",
        end_timer: ""
    };
    const INITIAL_Info = {
        call_info: "",
        call_address: "",
        call_description: "",
        company_name: "",
        email: ""
    }

    const INITIAL_MAIL = {
        emailCompany: "",
        fields: "",
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone: "",
        country: "",
        city: ""
    }
    const [inputList, setInputList] = useState<any>([]);
    const [newCall, setNewCall] = useState<any>(INITIAL_Call);
    const [mailData, setMailData] = useState<any>(INITIAL_MAIL)
    const [newInfo, setNewInfo] = useState<any>(INITIAL_Info);

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
    const changeInputEvent = (e: any, index: any): void => {
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

    const blurInputEvent = (e: any, index: any): void => {
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
        if (detail && detail.id) {
            console.log(detail)
            let startTime = getTimestampInSeconds();
            setNewInfo({
                call_info: detail.company_info,
                call_address: detail.address,
                call_description: detail.description,
                company_name: detail.name,
                email: detail.email,
            });
            setNewCall({
                user_id: users.id,
                company_id: detail.id,
                price_per_call: detail.price_per_call,
                initial_time: detail.initial_time,
                price_per_minutes_overdue: detail.price_per_minutes_overdue,
                overdue_time: detail.overdue_time,
                start_timer: startTime
            });
            let fields = JSON.parse(detail.company_fields)
            console.log(detail.company_fields)
            setInputList(fields)
            setNewCallErrors({});
        }


    }, [detail]);




    useEffect(() => {
        if (call.add.errors) {
            setNewCallErrors(call.add.errors);
        }
    }, [call.add]);

    const CreateCall = (): void => {
        let endTime = getTimestampInSeconds();
        console.log(endTime)
        console.log(newInfo.email)
        dispatch(addCall({ ...newCall, call_fields: JSON.stringify(inputList), end_timer: endTime, gender: gender }, navigate))
        if (sendMail) dispatch(mailSend({ ...mailData, fields: JSON.stringify(inputList), emailCompany: newInfo.email, first_name: newCall.first_name, last_name: newCall.last_name, gender: newCall.gender, email: newCall.email, city: newCall.city, country: newCall.country, phone: newCall.phone }))
    };


    let beutifyString = (value: any) => {
        let temp = value
        temp = temp.replace(/_+/g, ' ')
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp
    }

    const handleGender = (e: any): void => {
        const value = e.target.value;
        setGender(value);
    };

    const handleMr = (e: any): void => {
        const value = e.target.value;
        setMr(value)
    }

    return (
        <DashboardLayout>
            <div id="call-admin-modal">
                <div id="info">
                </div>
                <div className="company_information">
                    <div><strong>Company name:</strong>{newInfo.company_name}</div>
                    <div><strong>Company address:</strong>{newInfo.call_address}</div>
                    <div><strong>Company description:</strong>{newInfo.call_description}</div>
                </div>
                <div className="secDiv">
                    <div className="call_information">
                        <div><strong>Call information:</strong>{newInfo.call_info}</div>
                    </div>
                    <div className="form">
                        <Form>
                            <div>

                                <h2 className="adm">Name</h2>
                                <Input
                                    id={"name"}
                                    className="inputs"
                                    type={"text"}
                                    name={"name"}
                                    value={newCall["name"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["name"]}
                                    placeholder={"name"}
                                />
                                <div className="toggle">
                                    <ToggleButtonGroup
                                        id="gender"
                                        onChange={(e): void => handleGender(e)}
                                        onBlur={(e: any): void => handleGender(e)}
                                        value={gender}
                                        aria-label="Gender"
                                        color="success"
                                    >

                                        <ToggleButton className="tglbtn" value={"male"} aria-label="male">Male</ToggleButton>
                                        <ToggleButton className="tglbtn" value={"female"} aria-label="female">Female</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                <h2 className="adm">Email</h2>
                                <Input
                                    id={"email"}
                                    className="inputs"
                                    type={"text"}
                                    name={"email"}
                                    value={newCall["email"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["email"]}
                                    placeholder={"email"}
                                />
                            </div>
                            <div>
                                <h2 className="adm">Phone</h2>
                                <Input
                                    id={"phone"}
                                    className="inputs"
                                    type={"text"}
                                    name={"phone"}
                                    value={newCall["phone"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["phone"]}
                                    placeholder={"phone"}
                                />

                                <h2 className="adm">Country</h2>
                                <Input
                                    id={"country"}
                                    className="inputs"
                                    type={"text"}
                                    name={"country"}
                                    value={newCall["country"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["country"]}
                                    placeholder={"country"}
                                />
                                <h2 className="adm">City</h2>

                                <Input
                                    id={"city"}
                                    className="inputs"
                                    type={"text"}
                                    name={"city"}
                                    value={newCall["city"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["city"]}
                                    placeholder={"city"}
                                />

                            </div>
                            <div>
                                <div className="custom">
                                    {inputList.map((field: any, i: any) => {
                                        return (<div key={i}>
                                            <h2 className="adm">{beutifyString(Object.keys(field)[0])}</h2>
                                            <Input
                                                id={"company_field" + i}
                                                name={Object.keys(field)[0]}
                                                type={"text"}
                                                value={Object.values(field)[0]}
                                                onChange={(e: any): void => changeInputEvent(e, i)}
                                                onBlur={(e: any): void => blurInputEvent(e, i)}
                                                placeholder={beutifyString(Object.keys(field)[0])}
                                            />
                                        </div>)
                                    })}
                                </div>
                                <Checkbox
                                    checkItem={(): void =>
                                        setSendMail(true)
                                    }
                                    label="Do you want to send email"
                                >
                                </Checkbox>
                            </div>


                        </Form>
                        <Button
                            btnClass={ButtonTypes.primary}
                            onClick={() => CreateCall()}
                            loading={call.add.loading}
                            disabled={call.add.loading || hasSomeErrors()}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CallPage;