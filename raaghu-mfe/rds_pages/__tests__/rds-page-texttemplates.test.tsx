import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import TextTemplates from "../rds-page-texttemplate/src/texttemplate/text-template";
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

it("renders Text Templates page correctly", () => {
    render(
        <Provider store={store}>
            <TextTemplates />
        </Provider>
    );

    var name = (screen.getAllByText("TextTemplateManagement.TargetCultureName"))[0];
    expect(name).toBeInTheDocument();

});
