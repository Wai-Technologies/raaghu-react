import React, { Suspense } from "react";
import Auditlogs from "./Auditlogs/Auditlogs";

const App = () => (
    <Suspense>
        <Auditlogs></Auditlogs>
    </Suspense>
);

export default App;
