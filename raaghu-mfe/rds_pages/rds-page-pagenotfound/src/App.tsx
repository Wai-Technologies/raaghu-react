import React, { Suspense } from "react";
import PageNotFound from "./PageNotFound/PageNotFound";

const App = () => (
    <Suspense>
        <PageNotFound></PageNotFound>
    </Suspense>
);
export default App;