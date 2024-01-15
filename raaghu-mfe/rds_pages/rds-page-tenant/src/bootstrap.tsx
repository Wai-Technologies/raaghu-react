import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../../libs/public.api";

ReactDOM.render(
    <PersistGate loading={null} persistor={persistor}>
        <div>
            <App />
        </div>
    </PersistGate>,
    document.getElementById("root")
);
