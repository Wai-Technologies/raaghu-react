import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import ChangePassword from "./changepassword";
import { store, useAppDispatch } from "../../../../libs/state-management/index";
import { RdsCompChangeUserPassword } from "../../../rds-components";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

global.location = {
    pathname: "../../../../libs/proxy/core",
} as any;

// Mock the useAppDispatch function
jest.mock("../../../../libs/state-management/index.ts", () => ({
    ...jest.requireActual("../../../../libs/state-management/index.ts"),
    useAppDispatch: jest.fn(),
}));

// Mock the rds-elements and rds-components
jest.mock("../../../../../raaghu-elements/src", () => ({
    RdsButton: jest.fn(),
    RdsSearch: jest.fn(),
    RdsModal: jest.fn(),
    RdsInput: jest.fn()
}));

jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompChangeUserPassword: jest.fn(),
}));

describe("Change Password page", () => {
    it("renders Change Password page correctly", async () => {
        // Mock the useAppDispatch hook
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

        render(
            <Provider store={store}>
                <ChangePassword />
            </Provider>
        );
    });

    it("Check change passsword button click", async () => {
        const changePasswordData = jest.fn();
        const getPasswordDataSubmit = jest.fn();
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

        const password = render(
            <Provider store={store}>
                <ChangePassword />
                <RdsCompChangeUserPassword changePasswordData={changePasswordData} PasswordDataSubmit={(data: any) => getPasswordDataSubmit(data)}/>
            </Provider>
        );
        expect(password).toMatchSnapshot();
    });

    afterEach(() => {
        jest.clearAllMocks();
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
            length: 0,
            key: jest.fn(),
        };
    });
});
