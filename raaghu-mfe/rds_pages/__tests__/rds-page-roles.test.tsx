import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Roles from "../rds-page-roles/src/Roles/Roles";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));

it("renders Roles page correctly", () => {
    render(
        <Provider store={store}>
            <Roles />
        </Provider>
    );

    const newRoleText = screen.getAllByText("AbpIdentity.NewRole")[0];
    expect(newRoleText).toBeInTheDocument();

    const buttonElement = screen.getAllByRole("button")[0];
    expect(buttonElement).toBeInTheDocument();
});
