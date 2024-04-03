import React, { Suspense } from "react";
import ApiScope from "./apiScope/apiScope";

const App = () => (
    <Suspense>
        <ApiScope></ApiScope>
    </Suspense>
);

export default App;
