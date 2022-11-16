import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/BarChart/BarChart";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadStat } from "../../store/statistics/statistics.actions";

import phoneImage from "../../assets/FeatherSquare.svg"


import "./Dashboard.scss";

function Dashboard() {
    const statistic = useSelector((state: any) => state.statistic)

    const[statData,setStatData]=useState<any>("")

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStat())
    }, [])

    const INITIAL_GRAPH = {
        labels:"",
        datasets:""
    }


    const ref = useRef()

    useEffect(()=>{
        setUserData({
            labels: statistic.list.map((data: { dan: any; }) => data.dan),
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
    },[statistic.list])

    const [userData, setUserData] = useState({
        labels: statistic.list.map((data: { dan: any; }) => data.dan),
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
