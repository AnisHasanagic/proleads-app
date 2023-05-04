import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadCompanies } from "../../store/company/company.actions";
import { Input } from "../../components/Input/Input";
import "./AgentList.scss";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import BarChart from "../../components/BarChart/BarChart";
import { loadStat } from "../../store/statistics/statistics.actions";

import phoneImage from "../../assets/FeatherSquare.svg";

function AgentList() {
    const dispatch = useDispatch();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);

    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    const company = useSelector((state: any) => state.company);
    const auth = useSelector((state: any) => state.user);

    useEffect(() => {
        dispatch(loadStat());
    }, []);

    useEffect(() => {
        dispatch(loadCompanies(false));
    }, []);

    const showCompany = (companys: any) => {
        setIsAdd(false);
        setCurrentCompany(companys);
        window.location.href = "/dashboard/call/" + companys.id, companys.id;
    };

    const actions = [
        {
            name: "Edit",
            row: "id",
            icon: <CallIcon />,
            action: showCompany,
        },
    ];

    const columnsToShow = ["name", "phone"];

    const keys = ["name", "phone"];

    const search = (data: any) => {
        return data.filter((item: any) =>
            keys.some((key) =>
                item[key].toString().toLowerCase().includes(searchValue)
            )
        );
    };

    return (
        <DashboardLayout>
            <section id="agent-company">
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
                <div className="mr-3">
                    <h1>Bellen</h1>
                    <p>
                        Maak een lijst van bedrijven die aan u zijn toegewezen
                    </p>
                </div>
                <div className="search-butt">
                    <Input
                        id={"search"}
                        type={"text"}
                        className={"search"}
                        onChange={(e: any): void =>
                            setSearchValue(e.target.value)
                        }
                        placeholder={"Zoekopdracht..."}
                        disabled={company.list.length === 0}
                    />
                </div>
                <Table
                    data={search(company.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                    actionsOnRow={{
                        name: showCompany,
                    }}
                />
            </section>
        </DashboardLayout>
    );
}

export default AgentList;
