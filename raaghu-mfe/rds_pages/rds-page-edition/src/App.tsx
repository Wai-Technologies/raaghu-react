import React, { Suspense } from "react";
import Edition from "./edition/edition";

const App = () => (
    <Suspense>
        <Edition></Edition>
    </Suspense>
);

export default App;
