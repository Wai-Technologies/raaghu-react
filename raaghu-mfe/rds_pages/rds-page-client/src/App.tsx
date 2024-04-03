import React, { Suspense } from "react";
import Client from "./client/client";

const App = () => (
    <Suspense>
        <Client></Client>
    </Suspense>
);

export default App;
