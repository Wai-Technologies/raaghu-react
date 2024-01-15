import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import MyAccount from "../rds-page-myaccount/src/my-account/my-account";
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

it("renders MyAccounts page correctly", () => {
    render(
        <Provider store={store}>
            <MyAccount />
        </Provider>
    );
});
