import React from "react";

import "./DashboardLayout.scss";

import { DashboardMenu } from "../components/DashboardMenu/DashboardMenu";

function DashboardLayout({ children }: any) {
    return (
        <div id="dashboard-page">
            <DashboardMenu />
            <div className="page">
                <div className="content">{children}</div>
            </div>
            <div className="green-details"></div>
        </div>
    );
}

export default DashboardLayout;
