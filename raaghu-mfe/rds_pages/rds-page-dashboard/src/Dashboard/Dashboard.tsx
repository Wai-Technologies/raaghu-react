import React, { Suspense } from "react";
import AdminDashboard from "../adminDashboard/adminDashboard";
import TenantDashboard from "../tenantDashboard/tenantDashboard";

export interface DashboardProps { }

const Dashboard = (props: DashboardProps) => {
    const isTenant = localStorage.getItem("abpSession");
    const isImpersonation = localStorage.getItem("isImpersonation") === "true";

    // Check conditions and determine which dashboard to render
    let dashboardToRender;

    if (isTenant) {
        dashboardToRender = <TenantDashboard />;
    } else {
        dashboardToRender = <AdminDashboard user={`${localStorage.getItem("userName")}`} />;
    }

    return (
        <Suspense>
            {dashboardToRender}
        </Suspense>
    );
}


export default Dashboard;
