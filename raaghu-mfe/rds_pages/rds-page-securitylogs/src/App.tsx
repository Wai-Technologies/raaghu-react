import React, { Suspense } from "react";
import SecurityLogs from "./security-logs/SecurityLogs";

const App = () => (
    <Suspense>
        <SecurityLogs></SecurityLogs>
    </Suspense>
);

export default App;
