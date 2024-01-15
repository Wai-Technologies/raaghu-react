import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ChangePassword from "../rds-page-changepassword/src/changepassword/changepassword";
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

it("renders Change Password page correctly", () => {
    render(
        <Provider store={store}>
            <ChangePassword />
        </Provider>
    );
});
