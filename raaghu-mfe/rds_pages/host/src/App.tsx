import React, { Suspense } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.scss";
import AuthHigherComponent from "./AuthHigherComponent";

const App = () => {
    return (
        <Suspense>
            <AuthHigherComponent></AuthHigherComponent>
        </Suspense>
    );
};

export default App;
