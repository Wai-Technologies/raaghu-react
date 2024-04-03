import React, { Suspense } from "react";
import LinkedAccounts from "./linkedAccounts/LinkedAccounts";

const App = () => (
    <Suspense>
        <LinkedAccounts></LinkedAccounts>
    </Suspense>
);
export default App;