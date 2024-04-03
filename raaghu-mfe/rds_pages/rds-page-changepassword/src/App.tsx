import { Suspense } from "react";
import React from "react";
import ChangePassword from "./changepassword/changepassword";

const App = () => (
    <Suspense>
        <ChangePassword></ChangePassword>
    </Suspense>
);

export default App;
