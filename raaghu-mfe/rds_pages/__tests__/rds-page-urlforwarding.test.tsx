import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import UrlForwarding from "../rds-page-urlforwarding/src/url-forwarding/url-forwarding";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: "3rdParty",
        init: jest.fn(),
    },
}));

it("renders URL Forwarding page correctly", () => {
    render(
        <Provider store={store}>
            <UrlForwarding />
        </Provider>
    );

    // expect(screen.getByTestId("new-language")).toBeInTheDocument();
    // const displayNameText = screen.getAllByText("Source");
    // displayNameText.forEach(item=>{
    //     expect(item).toBeInTheDocument();
    // })
});
