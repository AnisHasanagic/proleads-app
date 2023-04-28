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

import phoneImage from "../../assets/FeatherSquare.svg";

function CallPage() {
    const { id }: any = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detail = useSelector((state: any) => state.detail);
    const call = useSelector((state: any) => state.call);
    const users = useSelector((state: any) => state.user);
    const auth = useSelector((state: any) => state.user);

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
        call_fields: "",
        full_name: "",
        gender: "",
        email: [],
        user_email: "",
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

    const validations: any = {};

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
                        errors.push("Veld is verplicht.");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("Veld is verplicht.");
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
                        errors.push("Veld is verplicht.");
                    }
                } else {
                    if (name.length < 1) {
                        errors.push("Veld is verplicht.");
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
                        errors.push("Veld is verplicht.");
                    }
                } else {
                    if (name.length < 1) {
                        errors.push("Veld is verplicht.");
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
                    email: newCall.email
                        .map((email: any) => email.value)
                        .join(","),
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

    const email_options = newInfo.email.split(",").map((email: string) => {
        return {
            value: email,
            label: email,
        };
    });

    useEffect(() => {
        if (
            newCall.action === "send_email" ||
            (newCall.action === "connect_and_send_email" &&
                email_options.length === 1)
        ) {
            setNewCall({
                ...newCall,
                email: [
                    {
                        label: email_options[0].label,
                        value: email_options[0].value,
                    },
                ],
            });
        } else {
            setNewCall({
                ...newCall,
                email: [],
            });
        }
    }, [newCall.action]);

    return (
        <DashboardLayout>
            <div id="call-admin-modal">
                <h1>{newInfo.company_name}</h1>
                <div className="design">
                    <div>
                        <div className="headChart">
                            <img src={phoneImage} alt="" />
                            <h2 className="adm">Aantal telefoontjes vandaag</h2>
                        </div>
                        <ul className="list-active">
                            <li>Totaal: {auth.calls.length}</li>
                            <li>
                                Verzonden e-mails:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action === "send_email"
                                    ).length
                                }
                            </li>
                            <li>
                                Doorverbonden en stuur e-mail:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action ===
                                            "connect_and_send_email"
                                    ).length
                                }
                            </li>
                            <li>
                                Doorverbonden:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) => call.action === "connect"
                                    ).length
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="posDiv">
                    <div className="secDiv">
                        <div className="form">
                            <Form>
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
                                <Input
                                    id={"phone"}
                                    className="inputs"
                                    type={"text"}
                                    name={"phone"}
                                    value={newCall["phone"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["phone"]}
                                    placeholder={"Telefoon"}
                                    label={"Telefoon"}
                                />
                                <Input
                                    id={"user_email"}
                                    className="inputs"
                                    type={"text"}
                                    name={"user_email"}
                                    value={newCall["user_email"]}
                                    onChange={(e: any): void => changeEvent(e)}
                                    onBlur={(e: any): void => blurEvent(e)}
                                    errors={newCallErrors["user_email"]}
                                    placeholder={"Email"}
                                    label={"Email"}
                                />
                                {inputList.map((field: any, i: any) => {
                                    return (
                                        <Input
                                            key={"company_field" + i}
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
                                        <MenuItem value={""}>Overige</MenuItem>
                                        <MenuItem value={"send_email"}>
                                            Email notificatie
                                        </MenuItem>
                                        <MenuItem
                                            value={"connect_and_send_email"}
                                        >
                                            Doorverbonden en stuur e-mail
                                        </MenuItem>
                                        <MenuItem value={"connect"}>
                                            Doorverbonden
                                        </MenuItem>
                                    </Select>
                                </div>
                                <p className="desc">
                                    Actie geeft aan wat er zal gebeuren nadat de
                                    oproep is gemaakt.
                                </p>
                                {(newCall.action === "send_email" ||
                                    newCall.action ===
                                        "connect_and_send_email") && (
                                    <div className="emails">
                                        <RNSelect
                                            isMulti
                                            name="email"
                                            placeholder="Selecteer e-mails"
                                            options={email_options}
                                            value={newCall.email}
                                            onChange={(e) => {
                                                setNewCall({
                                                    ...newCall,
                                                    email: e,
                                                });
                                            }}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </div>
                                )}
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
                                                <strong>Bedrijfsadres: </strong>
                                                {newInfo.call_address}
                                            </div>
                                            <div>
                                                <strong>
                                                    E-mail bedrijf:{" "}
                                                </strong>
                                                {newInfo.email}
                                            </div>
                                            <div>
                                                <strong>
                                                    Bedrijfstelefoon:{" "}
                                                </strong>
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
                                <div dangerouslySetInnerHTML={{ __html: newInfo.call_description }} />
                            </div>
                        </div>

                        <div className="company_information">
                            <div className="scrollInfo">
                                <strong>Oproepinformatie: </strong>
                                <div dangerouslySetInnerHTML={{ __html: newInfo.call_info }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CallPage;
