import React, { Suspense } from "react";
import GlobalResources from "./globalResources/globalResources";

const App = () => (
    <Suspense>
        <GlobalResources></GlobalResources>
    </Suspense>
);

export default App;
