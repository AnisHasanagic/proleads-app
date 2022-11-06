import React from "react";
import {Bar} from "react-chartjs-2";


function BarChart({chartData,ref}:any) {
    return <Bar data={chartData} redraw/>
}

export default BarChart