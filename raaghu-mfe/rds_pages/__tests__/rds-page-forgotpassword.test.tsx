import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ForgotPassword from "../rds-page-forgotpassword/src/forgotpassword/forgotpassword";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));
  

it("renders Forgot Password page correctly", () => {
    render(
        <Provider store={store}>
            <ForgotPassword />
        </Provider>
    );
});
