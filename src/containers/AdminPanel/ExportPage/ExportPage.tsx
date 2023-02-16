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
import { utils, writeFile } from "xlsx";
import { toast } from "react-toastify";

function ExportPage() {
    const dispatch = useDispatch();
    const { id }: any = useParams();

    const navigate = useNavigate();

    const INITIAL_STATE = {
        company_id: "",
        startDate: "",
    };

    const [searchValue, setSearchValue] = useState<any>(null);
    const call = useSelector((state: any) => state.call);
    const company = useSelector((state: any) => state.company);
    const [exportData, setexportData] = useState<any>(INITIAL_STATE);
    const detail = useSelector((state: any) => state.detail);
    const [excel, setExcel] = useState(call.list);

    const [exist, setExist] = useState<any>(false);

    let validations: any = {
        startDate: {
            isRequired: true,
        },
    };
    const columnsToShow = [
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
        "time",
        "price",
    ];

    const keys = [
        "price_per_call",
        "price_per_minutes_overdue",
        "initial_time",
        "overdue_time",
        "time",
        "price",
    ];
    const search = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) =>
                item[key].toString().toLowerCase().includes(searchValue)
            )
        );
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
        dispatch(loadCalls(exportData));
        setExist(true);
    };

    useEffect(() => {
        setExcel(call.list);
    }, [call.list]);

    useEffect(() => {
        dispatch(loadCalls(exportData));
    }, []);

    useEffect(() => {
        if (id) {
            setexportData({
                company_id: id,
            });
        }
    }, [id]);

    const handleExport = () => {
        if (call.list.length === 0) return;

        var wb = utils.book_new(),
            ws = utils.json_to_sheet([
                ...call.list,
                {
                    full_name: "",
                },
            ]);

        let headers = Object.keys(call.list[0]);

        headers = headers.map((header) =>
            header
                .replace(/_/g, " ")
                .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        );

        const total_price = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator + currentValue.price,
            0
        );

        ws["A" + (call.list.length + 2)] = { t: "s", v: "Total Price" };
        ws["M" + (call.list.length + 2)] = { t: "n", v: total_price };

        utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

        utils.book_append_sheet(wb, ws, "List of calls");

        const name = `${exportData.company_id}-${exportData.startDate}-${
            exportData.startDate
        }-${Date.now()}.xlsx`;

        writeFile(wb, name);
        navigate("/dashboard/admin-panel/calls");
        toast.success("DATA_EXPORTED_SUCCESSFULLY");
    };

    return (
        <DashboardLayout>
            <section id="admin-company">
                <div className="mr-3">
                    <h1>Exporteren</h1>
                    <p>
                        Selecteer de maand waarvoor u geëxporteerde gegevens
                        nodig heeft.
                    </p>
                    <div>{company.company_info}</div>
                </div>
                <div id="export-modal">
                    <div className="dates">
                        <Input
                            id={"startDate"}
                            type={"month"}
                            name={"startDate"}
                            value={exportData["startDate"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            placeholder={"from"}
                            label="Maand:"
                        />
                    </div>
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => CreateCallList()}
                    >
                        Creëren
                    </Button>
                    {exist && (
                        <div className="preview">
                            <Table
                                data={call.list}
                                columnsToShow={columnsToShow}
                            />
                            {excel.length > 0 && (
                                <Button
                                    btnClass={ButtonTypes.primary}
                                    onClick={() => handleExport()}
                                >
                                    Exporteren
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
}

export default ExportPage;
