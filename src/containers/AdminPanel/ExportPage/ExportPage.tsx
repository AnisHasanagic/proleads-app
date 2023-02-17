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
        if (id) {
            setexportData({
                company_id: id,
                startDate: "",
            });
        }
    }, [id]);

    const handleExport = () => {
        if (call.list.length === 0 || !call.company_package) return;

        console.log(call.list);

        const new_list = call.list.map((call: any) => {
            return {
                behandeldatum: moment(call.created_at).format("DD/MM/YYYY"),
                behandeltijd: moment(call.created_at).format("HH:mm:ss"),
                Gespreksduur: moment.utc(call.time * 1000).format("mm:ss"),
                bedrijfsnaam: `${call.gender === "male" ? "Dhr." : "Mevr."} ${
                    call.full_name
                }`,
                telefoon_nr: call.phone,
                email: call.email,
                Waarden: call.action,
                notitie: call.description,
                col: ""
            };
        });

        var wb = utils.book_new(),
            ws = utils.json_to_sheet([
                ...new_list,
                {
                    behandeldatum: "",
                },
                {
                    behandeldatum: "",
                },
                {
                    behandeldatum: "",
                },
                {
                    behandeldatum: "",
                },
            ]);

        let headers = Object.keys(call.list[0]);

        headers = [
            "behandeldatum",
            "behandeltijd",
            "Gespreksduur",
            "bedrijfsnaam",
            "telefoon_nr",
            "email",
            "Waarden",
            "notitie",
            ""
        ];

        const total_price = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator + currentValue.price,
            0
        );

        const total_over_seconds = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator +
                (currentValue.time - currentValue.initial_time > 0
                    ? currentValue.time - currentValue.initial_time
                    : 0),
            0
        );

        const total_connected = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator +
                (currentValue.action === 'connect_and_send_email' ? 1 : 0),
            0
        );


        // ws["A" + (call.list.length + 2)] = { t: "s", v: "Total Price" };
        // ws["M" + (call.list.length + 2)] = { t: "n", v: total_price };

        ws["C" + (call.list.length + 3)] = {
            t: "s",
            v: `${total_over_seconds} sec`,
        };
        ws["A" + (call.list.length + 4)] = { t: "s", v: "Mand" };
        ws["B" + (call.list.length + 4)] = { t: "s", v: "Abonnement" };
        ws["C" + (call.list.length + 4)] = { t: "s", v: "24/7 toeslag" };
        ws["D" + (call.list.length + 4)] = { t: "s", v: "Aantals calls" };
        ws["E" + (call.list.length + 4)] = { t: "s", v: "Ingekochte calls" };
        ws["F" + (call.list.length + 4)] = { t: "s", v: "Sec boven call" };
        ws["G" + (call.list.length + 4)] = { t: "s", v: "overgebleven calls" };
        ws["H" + (call.list.length + 4)] = { t: "s", v: "Overgebleven calls" };
        ws["I" + (call.list.length + 4)] = {
            t: "s",
            v: `Doorverbonden  € ${parseFloat(
                call.list[0].price_per_connect
            ).toFixed(2)}`,
        };

        ws["A" + (call.list.length + 5)] = {
            t: "s",
            v: moment(exportData.startDate).format("MMM"),
        };
        ws["B" + (call.list.length + 5)] = {
            t: "s",
            v: `${call.company_package.total_calls_available} calls`,
        };
        ws["D" + (call.list.length + 5)] = { t: "s", v: call.list.length };
        ws["E" + (call.list.length + 5)] = {
            t: "s",
            v:
                call.company_package.total_calls_available +
                call.company_package.total_calls_from_prev_month,
        };
        ws["F" + (call.list.length + 5)] = {
            t: "s",
            v: `${total_over_seconds} x € ${parseFloat(
                call.list[0].price_per_minutes_overdue
            ).toFixed(2)} = € ${(
                (total_over_seconds / call.list[0].overdue_time) *
                call.list[0].price_per_minutes_overdue
            ).toFixed(2)}`,
        };

        const total_used =
            call.company_package.total_calls_available +
            call.company_package.total_calls_from_prev_month -
            call.list.length;

        ws["G" + (call.list.length + 5)] = {
            t: "s",
            v: `${total_used < 0 ? Math.abs(total_used) : 0} calls x € ${
                call.list[0].price_per_call
            } = € ${(
                (total_used < 0 ? Math.abs(total_used) : 0) * call.list.length
            ).toFixed(2)}`,
        };

        ws["H" + (call.list.length + 5)] = {
            t: "s",
            v: total_used > 0 ? total_used : 0,
        };

        ws["I" + (call.list.length + 5)] = {
            t: "s",
            v: `${total_connected}  keer  x € ${call.list[0].price_per_connect} = € ${(total_connected * call.list[0].price_per_connect).toFixed(2)}`,
        };

        utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

        utils.book_append_sheet(
            wb,
            ws,
            moment(exportData.startDate).format("MMMM")
        );

        const name = `${exportData.company_id}-${
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
                            {call.list.length > 0 && (
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
