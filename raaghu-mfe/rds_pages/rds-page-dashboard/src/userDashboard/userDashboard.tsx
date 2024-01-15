import React, { Suspense } from "react";

export interface UserDashboardProps { }

const UserDashboard = (props: UserDashboardProps) => (
    <Suspense>
        <span>Hello , user Dashboard</span>
    </Suspense>
);

export default UserDashboard;
