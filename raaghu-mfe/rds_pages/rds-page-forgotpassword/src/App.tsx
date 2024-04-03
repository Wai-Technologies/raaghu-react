import { Suspense } from "react";
import React from "react";
import ForgotPassword from "./forgotpassword/forgotpassword";

const App = () => (
    <Suspense>
        <ForgotPassword></ForgotPassword>
    </Suspense>
);

export default App;
