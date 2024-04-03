import React from "react";
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import ApiScope from "./apiScope";
import { RdsButton, RdsSearch } from "../../../rds-elements";
import { RdsCompApiScopeBasicResource } from "../../../rds-components";

global.location = {
  pathname: "../../../../libs/proxy/core"
} as any;

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
  }),
}));
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
  
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas:jest.fn()
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
describe("Api Scope page", () => {
  it("renders Api Scope page correctly", async () => {
    render(
      <Provider store={store}>
        <ApiScope />
      </Provider>
    );
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[button="AbpOpenIddict.NewScope"]');

  });

  it("Check the elements and component behaviour", async () => {
    const newScopebuttonHandler = jest.fn();
    const fieldScopeData = jest.fn();
    const handlerAddScope = jest.fn();
    const checkFunction = render(
      <Provider store={store}>
        <ApiScope />
        <RdsSearch placeholder={"Search"} size={"small"} />
        <RdsButton onClick={newScopebuttonHandler} />
        <RdsCompApiScopeBasicResource scopeData={fieldScopeData}  onSuccess={handlerAddScope} />
      </Provider>
    );
    expect(checkFunction).toMatchSnapshot();
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
