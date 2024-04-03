import React, { Suspense } from "react";
import PersonalData from "./personal-data/personal-data";

const App = () => {
    return (
        <Suspense>
            <PersonalData></PersonalData>
        </Suspense>
    );
};

export default App;