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
import { useParams } from "react-router-dom";
import { utils, writeFile } from "xlsx"

function ExportPage() {
    const dispatch = useDispatch();
    const {id} : any  = useParams()

    const INITIAL_STATE = {
        company_id:"",
        startDate: "",
        endDate: ""
    }

    const [searchValue, setSearchValue] = useState<any>(null)
    const call = useSelector((state: any) => state.call);
    const company = useSelector((state: any)=> state.company)
    const [exportData, setexportData] = useState<any>(INITIAL_STATE)

    
    
    let validations: any = {
        startDate: {
            isRequired: true
        },
        endDate: {
            isRequired: true
        }
    }
    const columnsToShow = [
        "call_fields",
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "start_timer",
        "end_timer",
        "overdue_time",
    ];

    const keys = columnsToShow
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

    const CreateCallList = ():void => {
        console.log(exportData)
        dispatch((loadCalls(exportData))
        )
        }

        useEffect(()=>{
            if(id){
              setexportData({
                  company_id:id,
              }
              )
            }
          },[id])

     const handleExport = () => {
        var wb = utils.book_new(),
        ws = utils.json_to_sheet(call.list);

        utils.book_append_sheet(wb,ws,"List of calls");

        writeFile(wb,"FirstExcel.xlsx")
     }


    return (
        <DashboardLayout>
            <section id="admin-company">
                <div className="mr-3">
                    <h1>All calls</h1>
                    <p>List of all calls.</p>
                    <div>{company.company_info}</div>
                </div>
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
                </div>
                
            </section>
        </DashboardLayout>
    );
}

export default ExportPage;
