import React, { Suspense } from "react";
import Applications from "./applications/applications";

const App = () => (
    <Suspense>
        <Applications></Applications>
    </Suspense>
);

export default App;