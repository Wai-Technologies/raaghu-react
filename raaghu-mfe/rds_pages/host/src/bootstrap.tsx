import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../libs/public.api";
import { Provider } from "react-redux";

(ReactDOM as any).createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    </Provider>
);

