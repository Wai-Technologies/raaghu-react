import React, { Suspense } from "react";
import Home from "./Home/Home";

const App = () => (
    <Suspense>
        <Home></Home>
    </Suspense>
);
export default App;