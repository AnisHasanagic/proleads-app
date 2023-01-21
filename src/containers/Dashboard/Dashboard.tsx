import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/BarChart/BarChart";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadStat } from "../../store/statistics/statistics.actions";

import phoneImage from "../../assets/FeatherSquare.svg";

import "./Dashboard.scss";

function Dashboard() {
    const statistic = useSelector((state: any) => state.statistic);
    const auth = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStat());
    }, []);

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
                <h1>Welcome 👋 </h1>
                <p>We hope you are making good progress on your calls!</p>
                <div className="design">
                    {auth.role === "admin" && (
                        <div>
                            <div className="headChart">
                                <img src={phoneImage} alt="" />
                                <h2 className="adm">Number of calls</h2>
                            </div>
                            <BarChart chartData={userData} />
                        </div>
                    )}
                </div>
                <div className="design">
                    <div>
                        <div className="headChart">
                            <img src={phoneImage} alt="" />
                            <h2 className="adm">Number of calls today</h2>
                        </div>
                        <ul>
                            <li>Total: {auth.calls.length}</li>
                            <li>
                                Sent emails:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action === "send_email"
                                    ).length
                                }
                            </li>
                            <li>
                                Sent email and connected:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action ===
                                            "connect_and_send_email"
                                    ).length
                                }
                            </li>
                            <li>
                                Wrong number:{" "}
                                {
                                    auth.calls.filter(
                                        (call: any) =>
                                            call.action === "wrong_number"
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
