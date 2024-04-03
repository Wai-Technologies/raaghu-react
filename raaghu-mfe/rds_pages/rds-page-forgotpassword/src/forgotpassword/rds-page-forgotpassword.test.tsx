import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import ForgotPassword from "./forgotpassword";
import { store } from "../../../../libs/state-management";
import { Provider } from "react-redux";
import { RdsCompForgotPassword } from "../../../rds-components";
import { RdsLabel } from "../../../../../raaghu-elements/src";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string) => key,
    }),
    initReactI18next: { // add this line
      type: "3rdParty",
      init: () => {},
    },
  }));
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

global.location = {
    pathname: "../../../../libs/proxy/core",
  } as any;
  
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
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
    RdsLabel : jest.fn(),
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompForgotPassword: jest.fn(),
  }));
  
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
  }));
  
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
  describe("Forgot password Page", () => {
it("renders Forgot Password page correctly", () => {
    render(
        <Provider store={store}>
            <ForgotPassword />
        </Provider>
    );
});

it("Check Forgot Password functionality", () => {
  const forgotPasswordHandler = jest.fn();
  const resendHandler = jest.fn();
  const onLoginHandler = jest.fn();
  const onClickHandler = jest.fn();
  const _currentLanguageLabel = "English";

  const password = render(
      <Provider store={store}>
          <ForgotPassword />
          <RdsCompForgotPassword languageLabel={_currentLanguageLabel} languageData={undefined} onForgotPassword={forgotPasswordHandler} onResend={resendHandler} onLogin={onLoginHandler} onClickHandler={onClickHandler} />
          <RdsLabel label="©2023 WAi Technologies. All rights reserved"/>
      </Provider>
  );
  expect(password).toMatchSnapshot();
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
  })