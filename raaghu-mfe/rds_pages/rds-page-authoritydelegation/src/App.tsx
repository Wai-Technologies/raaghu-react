import React, { Suspense } from "react";
import AuthorityDelegation from "./authorityDelegation/AuthorityDelegation";

const App = () => (
    <Suspense>
        <AuthorityDelegation></AuthorityDelegation>
    </Suspense>
);
export default App;