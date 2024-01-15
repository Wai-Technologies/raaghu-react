import React, { Suspense } from "react";
import Pages from "./pages/pages";

const App = () => (
    <Suspense>
        <Pages></Pages>
    </Suspense>
);

export default App;
