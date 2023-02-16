import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCall } from "../../store/call/call.actions";
import { Button, ButtonTypes } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import "./CallPage.scss";
import { loadCompany } from "../../store/detail/detail.actions";
import DashboardLayout from "../../layouts/DashboardLayout";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import MUIButton from "@mui/material/Button";
import RNSelect from "react-select";

function CallPage() {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detail = useSelector((state: any) => state.detail);
    const call = useSelector((state: any) => state.call);
    const users = useSelector((state: any) => state.user);

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    let getTimestampInSeconds = () => {
        return Math.floor(Date.now() / 1000);
    };

    useEffect(() => {
        dispatch(loadCompany(id));
    }, []);

    const INITIAL_Call = {
        company_id: "",
        user_id: "",
        start_time: "",
        end_time: "",
        price_per_call: "",
        price_per_connect: "",
        initial_time: "",
        price_per_minutes_overdue: "",
        overdue_time: "",
        call_fields: "",
        full_name: "",
        gender: "",
        email: [],
        phone: "",
        description: "",
        start_timer: "",
        end_timer: "",
        action: "",
    };

    const INITIAL_Info = {
        call_info: "",
        call_address: "",
        call_description: "",
        company_name: "",
        email: "",
        phone: "",
    };

    const [inputList, setInputList] = useState<any>([]);
    const [newCall, setNewCall] = useState<any>(INITIAL_Call);
    const [newInfo, setNewInfo] = useState<any>(INITIAL_Info);

    const [newCallErrors, setNewCallErrors] = useState<any>({});

    const validations: any = {
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
        let list = [...inputList];

        list = [
            ...list.slice(0, index),
            {
                [name]: value,
            },
            ...list.slice(index + 1),
        ];

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

    const blurInputEvent = (e: any, index: any): void => {
        const name = e.target.name;
        let value = e.target.value;
        let list = [...inputList];

        list = [
            ...list.slice(0, index),
            {
                [name]: value,
            },
            ...list.slice(index + 1),
        ];

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
            let startTime = getTimestampInSeconds();
            setNewInfo({
                ...INITIAL_Info,
                call_info: detail.company_info,
                call_address: detail.address,
                call_description: detail.description,
                company_name: detail.name,
                email: detail.email,
                phone: detail.phone,
            });
            setNewCall({
                ...INITIAL_Call,
                user_id: users.id,
                company_id: detail.id,
                price_per_call: detail.price_per_call,
                price_per_connect: detail.price_per_connect,
                initial_time: detail.initial_time,
                price_per_minutes_overdue: detail.price_per_minutes_overdue,
                overdue_time: detail.overdue_time,
                start_timer: startTime,
            });
            let fields = JSON.parse(detail.company_fields);
            setInputList(fields);
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
        dispatch(
            addCall(
                {
                    ...newCall,
                    email: newCall.email.join(','),
                    call_fields: JSON.stringify(inputList),
                    end_timer: endTime,
                },
                navigate
            )
        );
    };

    let beutifyString = (value: any) => {
        let temp = value;
        temp = temp.replace(/_+/g, " ");
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp;
    };

    const handleGender = (e: any): void => {
        setNewCall({
            ...newCall,
            gender: e.target.value,
        });
    };

    const handleAction = (e: any): void => {
        setNewCall({
            ...newCall,
            action: e.target.value,
        });
    };

    useEffect(() => {
        setNewCall({
            ...newCall,
            email: [],
        })
    }, [newCall.action]);

    return (
        <DashboardLayout>
            <div id="call-admin-modal">
                <h1>{newInfo.company_name}</h1>
                <div className="posDiv">
                    <div className="secDiv">
                        <div className="form">
                            <Form>
                                {inputList.map((field: any, i: any) => {
                                    return (
                                        <Input
                                            id={"company_field" + i}
                                            name={Object.keys(field)[0]}
                                            type={"text"}
                                            value={Object.values(field)[0]}
                                            onChange={(e: any): void =>
                                                changeInputEvent(e, i)
                                            }
                                            onBlur={(e: any): void =>
                                                blurInputEvent(e, i)
                                            }
                                            placeholder={beutifyString(
                                                Object.keys(field)[0]
                                            )}
                                            label={beutifyString(
                                                Object.keys(field)[0]
                                            )}
                                        />
                                    );
                                })}
                                <hr />
                                <div className="divi">
                                    <div className="inputFields">
                                        <p className="adm">Geslacht</p>
                                        <div className="toggle">
                                            <Select
                                                id="gender"
                                                label="Gender"
                                                onChange={handleGender}
                                                value={newCall.gender}
                                                aria-label="Gender"
                                                color="success"
                                                displayEmpty
                                            >
                                                <MenuItem value={""}>
                                                    Gen
                                                </MenuItem>
                                                <MenuItem value={"male"}>
                                                    Dhr.
                                                </MenuItem>
                                                <MenuItem value={"female"}>
                                                    Mevr.
                                                </MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="inputFields flex1">
                                        <Input
                                            id={"full_name"}
                                            className="inputs"
                                            type={"text"}
                                            name={"full_name"}
                                            value={newCall["full_name"]}
                                            onChange={(e: any): void =>
                                                changeEvent(e)
                                            }
                                            onBlur={(e: any): void =>
                                                blurEvent(e)
                                            }
                                            errors={newCallErrors["full_name"]}
                                            placeholder={"Voor-en achternaam"}
                                            label={"Voor-en achternaam"}
                                        />
                                    </div>
                                </div>

                                <div className="divi">
                                    <Input
                                        id={"phone"}
                                        className="inputs"
                                        type={"text"}
                                        name={"phone"}
                                        value={newCall["phone"]}
                                        onChange={(e: any): void =>
                                            changeEvent(e)
                                        }
                                        onBlur={(e: any): void => blurEvent(e)}
                                        errors={newCallErrors["phone"]}
                                        placeholder={"Telefoon"}
                                        label={"Telefoon"}
                                    />
                                </div>

                                <Input
                                    className="desc"
                                    id={"description"}
                                    type={"text"}
                                    name={"description"}
                                    value={newCall["description"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["description"]}
                                    placeholder={"Beschrijving"}
                                    label={"Beschrijving"}
                                    isTextarea
                                />

                                <hr />

                                <p className="adm">Actie</p>
                                <div className="toggle">
                                    <Select
                                        id="action"
                                        onChange={handleAction}
                                        value={newCall.action}
                                        aria-label="Action"
                                        color="success"
                                        displayEmpty
                                    >
                                        <MenuItem value={""}>Geen</MenuItem>
                                        <MenuItem value={"send_email"}>
                                            E-mail verzenden
                                        </MenuItem>
                                        <MenuItem
                                            value={"connect_and_send_email"}
                                        >
                                            Maak verbinding en stuur e-mail
                                        </MenuItem>
                                        <MenuItem value={"wrong_number"}>
                                            Verkeerd nummer
                                        </MenuItem>
                                    </Select>
                                </div>
                                <p className="desc">
                                    Actie geeft aan wat er zal gebeuren nadat de oproep is gemaakt.
                                </p>
                                {(newCall.action === 'send_email' || newCall.action === 'connect_and_send_email') && <div className="emails">
                                    <RNSelect
                                        isMulti
                                        name="email"
                                        placeholder="Selecteer e-mails"
                                        options={newInfo.email
                                            .split(",")
                                            .map((email: string) => {
                                                return {
                                                    value: email,
                                                    label: email,
                                                };
                                            })}
                                        onChange={(e) => {
                                            setNewCall({
                                                ...newCall,
                                                email: e.map(
                                                    (email: any) => email.value
                                                ),
                                            });
                                        }}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>}
                                <hr />

                                <Button
                                    btnClass={ButtonTypes.primary}
                                    onClick={() => CreateCall()}
                                    loading={call.add.loading}
                                    disabled={
                                        call.add.loading || hasSomeErrors()
                                    }
                                >
                                    Creëren
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div id="info">
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                                <Tooltip
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={handleTooltipClose}
                                    open={open}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={
                                        <div>
                                            <div>
                                                <strong>
                                                    Bedrijfsadres:{" "}
                                                </strong>
                                                {newInfo.call_address}
                                            </div>
                                            <div>
                                                <strong>E-mail bedrijf: </strong>
                                                {newInfo.email}
                                            </div>
                                            <div>
                                                <strong>Bedrijfstelefoon: </strong>
                                                {newInfo.phone}
                                            </div>
                                        </div>
                                    }
                                >
                                    <MUIButton onClick={handleTooltipOpen}>
                                        Details
                                    </MUIButton>
                                </Tooltip>
                            </div>
                        </ClickAwayListener>

                        <div className="company_information">
                            <div className="scrollInfo">
                                <strong>Bedrijfsinformatie: </strong>
                                {newInfo.call_description}
                            </div>
                        </div>

                        <div className="company_information">
                            <div className="scrollInfo">
                                <strong>Oproepinformatie: </strong>
                                {newInfo.call_info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CallPage;
