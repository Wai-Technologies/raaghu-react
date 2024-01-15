import React, { Suspense } from "react";
import MyAccount from "./my-account/my-account";

const App = () => {
    return (
        <Suspense>
            <MyAccount></MyAccount>
        </Suspense>
    );
};

export default App;