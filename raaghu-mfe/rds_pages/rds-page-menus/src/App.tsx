import React, { Suspense } from "react";
import Menus from "./menus/menus";

const App = () => (
    <Suspense>
        <Menus></Menus>
    </Suspense>
);

export default App;
