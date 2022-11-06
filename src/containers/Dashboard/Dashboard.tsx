import React, { useRef, useState } from "react";
import BarChart from "../../components/BarChart/BarChart";
import DashboardLayout from "../../layouts/DashboardLayout";

import "./Dashboard.scss";

function Dashboard() {


    const ref= useRef()
    const GraphData = [
        {
            year:"1999",
            count:2
        },
        {
            year:"1998",
            count:10
        },
        {
            year:"2000",
            count:5
        },
        {
            year:"2010",
            count:3
        },
        {
            year:"2011",
            count:12
        },
    ]

    const [userData, setUserData] = useState({
        labels: GraphData.map((data) => data.year),
        datasets: [
          {
            label: "Number of Calls",
            data: GraphData.map((data) => data.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    return (
        <DashboardLayout>
            <div id="privacy" className="container mx-auto py-[40px]">
                <h1>Welcome to Proleads</h1>
                
            </div>
        {/* <BarChart chartData={userData}/> */}
        </DashboardLayout>
    );
}

export default Dashboard;
