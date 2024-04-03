import React, { Suspense } from "react";
import Newsletters from "./newsletters/Newsletters";

const App = () => {
    return (
        <Suspense>
            <Newsletters></Newsletters>
        </Suspense>
    );
};

export default App;
