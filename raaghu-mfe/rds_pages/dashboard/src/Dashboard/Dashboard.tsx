import React, { Suspense } from "react";


const LoginCompo = React.lazy(() => import("rds_component/Rdscomplogin"));

var version = process.env.BUILD_DATE;

const Dashboard = () => (
	<Suspense>
		Latest Build Date:{version}
		<LoginCompo />					
	</Suspense>
);

export default Dashboard;