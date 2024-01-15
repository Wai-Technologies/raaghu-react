import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Edition from "../rds-page-edition/src/edition/edition";
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

it("renders Edition page correctly", () => {
    render(
        <Provider store={store}>
            <Edition />
        </Provider>
    );
});