import React, { Suspense } from "react";
import Language from "./language/language";
const App = () => {
    return (
        <Suspense>
            <Language
            ></Language>
        </Suspense>
    );
};

export default App;
