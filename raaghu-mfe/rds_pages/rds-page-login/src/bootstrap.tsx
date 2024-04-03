import App from "./App";
import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { store, persistor } from "../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <App />
                </div>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
