import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Forms from "../rds-page-forms/src/forms/forms";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));
  

it("renders Forms page correctly", () => {
    render(
        <Provider store={store}>
            <Forms />
        </Provider>
    );
    const descText = screen.getAllByText("New Form")[0];
    expect(descText).toBeInTheDocument();

    const newFormBtnText = screen.getAllByText("Forms.Link")[0];
    expect(newFormBtnText).toBeInTheDocument();
});
