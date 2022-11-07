import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/BarChart/BarChart";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadStat } from "../../store/statistics/statistics.actions";

import phoneImage from "../../assets/FeatherSquare.svg"


import "./Dashboard.scss";

function Dashboard() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStat())
    }, [])

    const statistic = useSelector((state: any) => state.statistic)



    const ref = useRef()


    const [userData, setUserData] = useState({
        labels: statistic.list.map((data: { count: any; }) => data.count),
        datasets: [
            {
                label: "Number of Calls",
                data: statistic.list.map((data: { count: any; }) => data.count),
                backgroundColor: [
                    "#9736E8",
                ],
                borderWidth: 2,
                barThickness: 20,
                borderRadius: 5,
            },
        ],
    });
    return (
        <DashboardLayout>
            <div className="Dashboard">
                <div id="privacy" className="container mx-auto py-[40px]">
                    <h1>Welcome to Proleads</h1>

                </div>
                <div className="design">
                        <div className="headChart">
                            <img src={phoneImage} alt="" />
                            <h2 className="adm">Number of calls</h2>
                        </div>
                        <BarChart chartData={userData} />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
