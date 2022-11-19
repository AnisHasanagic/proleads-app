import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCalls } from "../../../store/call/call.actions";



import { Input } from "../../../components/Input/Input";

import "./ExportPage.scss";
import { loadCompany } from "../../../store/company/company.actions";
import { useNavigate, useParams } from "react-router-dom";
import { utils, writeFile } from "xlsx"
import { toast } from "react-toastify";



function ExportPage() {
    const dispatch = useDispatch();
    const { id }: any = useParams()

    const navigate = useNavigate();

    const INITIAL_STATE = {
        company_id: "",
        startDate: "",
        endDate: ""
    }

    const [searchValue, setSearchValue] = useState<any>(null)
    const call = useSelector((state: any) => state.call);
    const company = useSelector((state: any) => state.company)
    const [exportData, setexportData] = useState<any>(INITIAL_STATE)
    const detail = useSelector((state: any) => state.detail)
    const [excel, setExcel] = useState(call.list)

    const [exist, setExist] = useState<any>(false)

    let validations: any = {
        startDate: {
            isRequired: true
        },
        endDate: {
            isRequired: true
        }
    }
    const columnsToShow = [
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
        "time",
        "price"
    ];

    const keys = [
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
        "time",
        "price"
    ];
    const search = (data: any) => {
        return data.filter(
            (item: any) =>
                keys.some(key => item[key].toString().toLowerCase().includes(searchValue)))
    }

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
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setexportData({
            ...exportData,
            [name]: value ? value.trim() : "",
        });

    };

    let sum: any = 0;


    const CreateCallList = (): void => {
        console.log(exportData)
        dispatch((loadCalls(exportData)))

        setExcel(call.list)

        setExist(true);
    }

    useEffect(()=>{
        dispatch((loadCalls(exportData)))
    },[])

    useEffect(() => {
        if (id) {
            setexportData({
                company_id: id,
            }
            )
        }
    }, [id])

    const handleExport = () => {
        var wb = utils.book_new(),
            ws = utils.json_to_sheet(call.list);

        utils.book_append_sheet(wb, ws, "List of calls");

        writeFile(wb, "Export.xlsx")
        navigate("/dashboard/admin-panel/calls")
        toast.success("DATA_EXPORTED_SUCCESSFULLY")
    }


    return (
        <DashboardLayout>
            <section id="admin-company">
                <div className="mr-3">
                    <h1>All calls</h1>
                    <p>List of all calls for a company.</p>
                    <div>{company.company_info}</div>
                </div>
                <div id="export-modal">
                    <div className="dates">
                        <Input
                            id={"startDate"}
                            type={"date"}
                            name={"startDate"}
                            value={exportData["startDate"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            placeholder={"from"}
                            label="Date from:"
                        />


                        <Input
                            id={"endDate"}
                            type={"date"}
                            name={"endDate"}
                            value={exportData["endDate"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            placeholder={"to"}
                            label="Date to:"
                        />
                    </div>
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => CreateCallList()}
                    >
                        Create
                    </Button>
                    {exist && (
                        <div className="preview">
                            <Table
                                data={call.list}
                                columnsToShow={columnsToShow}
                            />
                            <Button
                                btnClass={ButtonTypes.primary}
                                onClick={() => handleExport()}
                            >
                                Export
                            </Button>
                        </div>)}

                </div>

            </section>
        </DashboardLayout>
    );
}

export default ExportPage;
