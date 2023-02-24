import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCalls } from "../../../../store/call/call.actions";
import {
    updateCompany,
    addCompany,
} from "../../../../store/company/company.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import { Link } from "react-router-dom";

import "./ExportCallsModal.scss";

function ExportCallsModal({ companys }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const call_state = useSelector((state: any) => state.calls);

    const [calls, setCalls] = useState<any>(null);

    const INITIAL_STATE = {
        company_id: "",
        startDate: "",
        endDate: "",
    };

    let validations: any = {
        startDate: {
            isRequired: true,
        },
        endDate: {
            isRequired: true,
        },
    };

    const [exportData, setexportData] = useState<any>(INITIAL_STATE);

    /*
        useEffect(()=>{
            dispatch(loadCalls(company.company_id,Date.startDate,Date.endDate))
        },[Date.start_date,Date.endDate])*/

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

        setexportData({
            ...exportData,
            [name]: value ? value.trim() : "",
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

        setexportData({
            ...exportData,
            [name]: value ? value.trim() : "",
        });
    };
    useEffect(() => {
        if (companys) {
            setexportData({
                company_id: companys.id,
            });
        }
    }, [companys]);

    const CreateCallList = (): void => {
        dispatch(loadCalls(exportData));
    };

    return (
        <div id="Company-admin-modal">
            <Input
                id={"startDate"}
                type={"date"}
                name={"startDate"}
                value={exportData["startDate"]}
                onChange={(e: any): void => changeEvent(e)}
                onBlur={(e: any): void => blurEvent(e)}
                placeholder={"from"}
            />

            <Input
                id={"endDate"}
                type={"date"}
                name={"endDate"}
                value={exportData["endDate"]}
                onChange={(e: any): void => changeEvent(e)}
                onBlur={(e: any): void => blurEvent(e)}
                placeholder={"to"}
            />
            <Button
                btnClass={ButtonTypes.primary}
                onClick={() => CreateCallList()}
            >
                Create
            </Button>
        </div>
    );
}

export default ExportCallsModal;
