import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/BarChart/BarChart";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadStat } from "../../store/statistics/statistics.actions";

import phoneImage from "../../assets/FeatherSquare.svg";

import "./Dashboard.scss";
import { loadStatistics } from "../../store/users/users.actions";
import moment from "moment";

function Dashboard() {
    const statistic = useSelector((state: any) => state.statistic);
    const auth = useSelector((state: any) => state.user);
    const statistics = useSelector((state: any) => state.users.statistics);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStat());
    }, []);

    useEffect(() => {
        if (auth.role && auth.role === "admin") {
            dispatch(loadStatistics());
        }
    }, [auth.role]);

    useEffect(() => {
        setUserData({
            labels: statistic.list.map((data: { dan: any }) => data.dan),
            datasets: [
                {
                    label: "Number of Calls",
                    data: statistic.list.map(
                        (data: { count: any }) => data.count
                    ),
                    backgroundColor: ["#9736E8"],
                    borderWidth: 2,
                    barThickness: 20,
                    borderRadius: 5,
                },
            ],
        });
    }, [statistic.list]);

    const [userData, setUserData] = useState({
        labels: statistic.list.map((data: { dan: any }) => data.dan),
        datasets: [
            {
                label: "Number of Calls",
                data: statistic.list.map((data: { count: any }) => data.count),
                backgroundColor: ["#9736E8"],
                borderWidth: 2,
                barThickness: 20,
                borderRadius: 5,
            },
        ],
    });

    return (
        <DashboardLayout>
            <div className="Dashboard">
                <h1>Welkom 👋 </h1>
                <p>
                    We hopen dat je goede vorderingen maakt met je telefoontjes!
                </p>
                {auth.role === "admin" && (
                    <div className="design">
                        <div>
                            <div className="headChart">
                                <img src={phoneImage} alt="" />
                                <h2 className="adm">Actieve agenten vandaag</h2>
                            </div>
                            {statistics.list.map((stat, key) => {
                                let status = "not-active";

                                if (stat.calls.length > 0) {
                                    const duration = moment.duration(
                                        moment().diff(
                                            moment(stat.calls[0].created_at)
                                        )
                                    );
                                    const minutesDiff = duration.asMinutes();

                                    if (minutesDiff <= 30) {
                                        status = "active";
                                    }
                                }

                                return (
                                    <div key={key}>
                                        <p>
                                            <span
                                                className={`status ${status}`}
                                            ></span>
                                            <b>{stat.username}</b>
                                        </p>
                                        <p>
                                            <span>Laatste oproep vandaag:</span>
                                            &nbsp;
                                            <b>
                                                {stat.calls.length > 0
                                                    ? moment(
                                                          stat.calls[0]
                                                              .created_at
                                                      ).format("HH:mm:ss")
                                                    : "-"}
                                            </b>
                                        </p>
                                        <ul className="list-active">
                                            <li>Totaal: {stat.calls.length}</li>
                                            <li>
                                                Verzonden e-mails:{" "}
                                                {
                                                    stat.calls.filter(
                                                        (call: any) =>
                                                            call.action ===
                                                            "send_email"
                                                    ).length
                                                }
                                            </li>
                                            <li>
                                                Doorverbinden en stuur e-mail:{" "}
                                                {
                                                    stat.calls.filter(
                                                        (call: any) =>
                                                            call.action ===
                                                            "connect_and_send_email"
                                                    ).length
                                                }
                                            </li>
                                            <li>
                                                Doorverbinden:{" "}
                                                {
                                                    stat.calls.filter(
                                                        (call: any) =>
                                                            call.action ===
                                                            "connect"
                                                    ).length
                                                }
                                            </li>
                                        </ul>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {auth.role === "admin" && (
                    <div className="design">
                        <div>
                            <div className="headChart">
                                <img src={phoneImage} alt="" />
                                <h2 className="adm">Aantal oproepen</h2>
                            </div>
                            <BarChart chartData={userData} />
                        </div>
                    </div>
                )}
                <div className="design">
                    <div>
                        <div className="headChart">
                            <img src={phoneImage} alt="" />
                            <h2 className="adm">Aantal telefoontjes vandaag</h2>
                        </div>
                        <ul>
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
                                Doorverbinden en stuur e-mail:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action ===
                                            "connect_and_send_email"
                                    ).length
                                }
                            </li>
                            <li>
                                Doorverbinden:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) => call.action === "connect"
                                    ).length
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
