import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import App from "../rds-page-securitylogs/src/App";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

it("renders Security Logs page correctly", () => {
    render(
        <Provider store={store}>
            <App data-testid="security-logs"/>
        </Provider>
    );
});
