import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import FileManagement from "../rds-page-fileManagement/src/fileManagement/fileManagement";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

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

it("renders File Management page correctly", () => {
    render(
        <Provider store={store}>
            <FileManagement />
        </Provider>
    );
    const newFolderText = screen.getAllByText("NEW FOLDER")[0];
    expect(newFolderText).toBeInTheDocument();
});
