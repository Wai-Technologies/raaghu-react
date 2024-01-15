import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Register from "../rds-page-register/src/register/register";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";
import { BrowserRouter } from "react-router-dom";

// jest.mock("react", () => ({
//   useRef: () => jest.fn(),
// }));

// jest.mock("react-router-dom", () => ({
//   useNavigate: jest.fn(),
//   BrowserRouter: jest.requireActual("react-router-dom").BrowserRouter,
// }));
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: any) => key }),
    initReactI18next: { type: 'mock' },
  }));

it("renders Register page correctly", () => {
    render(
            <Provider store={store}>
                <Register />
            </Provider>
    );
});
