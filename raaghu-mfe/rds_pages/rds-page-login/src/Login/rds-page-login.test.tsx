import React from "react";
import "@testing-library/jest-dom";
import {render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import Login from "./Login";
import { RdsCompLogin } from "../../../rds-components";

global.location = {
  pathname: "../../../../libs/proxy/core",
} as any;

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: 'object', // or any type that matches your usage
    init: jest.fn(),
  },
}));

jest.mock("../../../../../raaghu-components/src/index.ts", () => ({
  ...jest.requireActual("../../../../../raaghu-components/src/index.ts"),
}));
jest.mock("../../../../../raaghu-elements/src/index.ts", () => ({
  ...jest.requireActual("../../../../../raaghu-elements/src/index.ts"),
}));
jest.mock("../../../../libs/state-management/index.ts", () => ({
  store: {
    getState: jest.fn().mockReturnValue({
      persistedReducer: {
        configureStore: {
          configuration: {
            auth: {
              grantedPolicies: {},
            },
          },
        },
      },
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

// Mock the rds-elements and rds-components
jest.mock("../../../../../raaghu-elements/src", () => ({
  RdsButton: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsAlert: jest.fn(),
  RdsSearch: jest.fn(),
  RdsModal: jest.fn(),
  RdsNavtabs: jest.fn(),
  RdsLabel: jest.fn(),
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompApplicationBasic: jest.fn(),
  RdsCompApplicationWorkflows: jest.fn(),
  RdsCompPermissionTree: jest.fn(),
  RdsCompLogin: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureMockStore();

// Mock localStorage in your test setup
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0, // Add length property
  key: jest.fn(), // Add key method
};

global.localStorage = localStorageMock;

describe("Login page", () => {
  it("renders Login page correctly", async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <Login onForgotPassword={function (isForgotPasswordClicked?: boolean | undefined): void {
            throw new Error("Function not implemented.");
        } } />
     </Provider>);
  });

  it("Check Login page correctly", async () => {
    const handlerDismissAlert = jest.fn();
    const loginHandler = jest.fn();
    const emailHandler = jest.fn();
    const passwordHandler = jest.fn();
    const forgotPasswordHandler = jest.fn();
    const validateTenant = jest.fn();
    const validateTenantName = jest.fn();
    const registerHandler = jest.fn();
    const onClickHandler = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <Login onForgotPassword={function (isForgotPasswordClicked?: boolean | undefined): void {
            throw new Error("Function not implemented.");
        } } />
        <RdsCompLogin onDismissAlert={handlerDismissAlert} onLogin={loginHandler} onEmailChange={emailHandler} onPasswordChange={passwordHandler} onForgotPassword={forgotPasswordHandler}
      validTenant={validateTenant} onRegister={registerHandler} getvalidTenantName={""} email={""} password={""} currentTenant={undefined} languageData={undefined}  onClickHandler={onClickHandler} />
     </Provider>);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
    // Reset localStorage to a new object
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