import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../../components/Button/Button";
import Table from "../../../components/Table/Table";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { loadCalls } from "../../../store/call/call.actions";

import { Input } from "../../../components/Input/Input";

import "./ExportPage.scss";
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
        "created_at",
        "time",
    ];

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

    const handleExport = async () => {
        if (call.list.length === 0 || !call.company_package) return;

        console.log(call.list);

        const callAction: any = {
            '': 'Geen email naar de klant',
            'send_email': 'Email notificatie',
            'connect_and_send_email': 'Doorverbonden en stuur e-mail',
            'connect': 'Doorverbonden'
        }

        let customFields: string[] = [];

        call.list.forEach((call: any) => {
            const customFields2 = JSON.parse(call.call_fields);

            for (let value of customFields2) {
                const keys = Object.keys(value);

                customFields = [...customFields, ...keys];
            }
        });

        customFields = [...new Set(customFields)];

        const new_list = call.list.map((call: any) => {
            const customFields2 = JSON.parse(call.call_fields);

            const customInputs = {};

            console.log(customFields2);
            
            customFields.forEach((key) => {
                const valueIndex = customFields2.findIndex((val) => val[key]);
                console.log(valueIndex);
                
                customInputs[key] = valueIndex > -1 ? customFields2[valueIndex][key] : '-';
            });

            console.log(customInputs);

            return {
                behandeldatum: moment(call.created_at).format("DD/MM/YYYY"),
                behandeltijd: moment(call.created_at).format("HH:mm:ss"),
                Gespreksduur: moment.utc(call.time * 1000).format("mm:ss"),
                bedrijfsnaam: `${call.gender === "male" ? "Dhr." : "Mevr."} ${
                    call.full_name
                }`,
                telefoon_nr: call.phone,
                email: call.user_email,
                ...customInputs,
                Waarden: callAction[call.action],
                notitie: call.description,
                col: "",
            };
        });

        console.log(new_list);

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
                {
                    behandeldatum: "",
                },
            ]);

        const headers = [
            "behandeldatum",
            "behandeltijd",
            "Gespreksduur",
            "bedrijfsnaam",
            "telefoon_nr",
            "email",
            ...customFields,
            "Waarden",
            "notitie",
            "",
        ];

        const total_over_seconds = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator +
                (currentValue.time - call.company_package.initial_time > 0
                    ? currentValue.time - call.company_package.initial_time
                    : 0),
            0
        );

        const total_connected = call.list.reduce(
            (accumulator: number, currentValue: any) =>
                accumulator +
                (currentValue.action === "connect_and_send_email" ||
                currentValue.action === "connect"
                    ? 1
                    : 0),
            0
        );

        ws["!ref"] = "A1:I" + call.list.length + 5;

        ws["A" + (call.list.length + 4)] = { t: "s", v: "Mand" };
        ws["B" + (call.list.length + 4)] = { t: "s", v: "Abonnement" };
        ws["C" + (call.list.length + 4)] = { t: "s", v: "24/7 toeslag" };
        ws["D" + (call.list.length + 4)] = { t: "s", v: "Aantals calls" };
        ws["E" + (call.list.length + 4)] = { t: "s", v: "Ingekochte calls" };
        ws["F" + (call.list.length + 4)] = { t: "s", v: "Sec boven call" };
        ws["G" + (call.list.length + 4)] = { t: "s", v: "Extra calls" };
        ws["H" + (call.list.length + 4)] = { t: "s", v: "Overgebleven calls" };
        ws["I" + (call.list.length + 4)] = {
            t: "s",
            v: `Doorverbonden  € ${parseFloat(
                call.company_package.price_per_connect
            ).toFixed(2)}`,
        };

        ws["A" + (call.list.length + 5)] = {
            t: "s",
            v: moment(exportData.startDate).format("MMMM"),
        };
        ws["B" + (call.list.length + 5)] = {
            t: "s",
            v: `${call.company_package.package_price} € / ${call.company_package.total_calls_available} calls`,
        };
        ws["C" + (call.list.length + 5)] = {
            t: "s",
            v: `${call.company_package.support_price} €`,
        };
        ws["D" + (call.list.length + 5)] = { t: "n", v: call.list.length };
        ws["E" + (call.list.length + 5)] = {
            t: "n",
            v:
                call.company_package.total_calls_available +
                call.company_package.total_calls_from_prev_month,
        };
        ws["F" + (call.list.length + 5)] = {
            t: "s",
            v: `${
                total_over_seconds / (call.company_package.overdue_time || 1)
            } x € ${parseFloat(
                call.company_package.price_per_minutes_overdue
            ).toFixed(2)} = € ${(
                (total_over_seconds / (call.company_package.overdue_time || 1)) *
                call.company_package.price_per_minutes_overdue
            ).toFixed(2)}`,
        };

        const total_used =
            call.company_package.total_calls_available +
            call.company_package.total_calls_from_prev_month -
            call.list.length;

        ws["G" + (call.list.length + 5)] = {
            t: "s",
            v: `${total_used < 0 ? Math.abs(total_used) : 0} calls x € ${
                call.company_package.price_per_call
            } = € ${(
                (total_used < 0 ? Math.abs(total_used) : 0) * call.company_package.price_per_call
            ).toFixed(2)}`,
        };

        ws["H" + (call.list.length + 5)] = {
            t: "n",
            v: total_used > 0 ? total_used : 0,
        };

        ws["I" + (call.list.length + 5)] = {
            t: "s",
            v: `${total_connected}  keer  x € ${
                call.company_package.price_per_connect
            } = € ${(
                total_connected * call.company_package.price_per_connect
            ).toFixed(2)}`,
        };

        const total_price =
            call.company_package.package_price +
            call.company_package.support_price +
            (total_over_seconds / (call.company_package.overdue_time || 1)) *
                call.company_package.price_per_minutes_overdue +
            (total_used < 0 ? Math.abs(total_used) : 0) * call.company_package.price_per_call +
            total_connected * call.company_package.price_per_connect;

        ws["A" + (call.list.length + 7)] = { t: "s", v: "Total" };
        ws["B" + (call.list.length + 7)] = {
            t: "s",
            v: `${total_price.toFixed(2)} €`,
        };

        utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

        utils.book_append_sheet(
            wb,
            ws,
            moment(exportData.startDate).format("MMMM YYYY")
        );

        const name = `${exportData.company_id}-${
            exportData.startDate
        }-${Date.now()}.xlsx`;

        await writeFile(wb, name);
        navigate("/dashboard/admin-panel/calls");
        toast.success("Gegevens succesvol geëxporteerd.");
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
                                data={call.list.map((call) => ({
                                    created_at: moment(call.created_at).format('DD-MM-YYYY HH:mm:ss'),
                                    time: call.time,
                                }))}
                                columnsToShow={columnsToShow}
                                showAll
                                hidePagination
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
