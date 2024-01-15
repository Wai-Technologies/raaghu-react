import App from "./App";
import ReactDOM from "react-dom";
import React from "react";
import { store, persistor } from "../../../libs/public.api";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div>
                <App />
            </div>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
