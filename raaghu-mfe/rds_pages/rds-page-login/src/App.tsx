import React, { Suspense } from "react";
import Login from "./Login/Login";

const App = () => {
    return (
        <Suspense>
            <Login onForgotPassword={function (_isForgotPasswordClicked?: boolean | undefined): void {
                throw new Error("Function not implemented.");
            }}></Login>
        </Suspense>
    );
};

export default App;
