import React from "react";
import "@testing-library/jest-dom";
import {render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import LinkedAccounts from "./LinkedAccounts";
import { RdsButton, RdsSearch } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";

global.location = {
  pathname: "../../../../libs/proxy/core",
} as any;

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
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
  RdsNavtabs: jest.fn(),
  RdsDatePicker: jest.fn(),
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

describe("linked accounts page", () => {
  it("renders linked accounts page correctly", async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <LinkedAccounts />
    </Provider>);
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[label="New Link Account"]');
  });

  it("Check linked account page functionality",async () =>
  {
    const handleSearchChange =jest.fn();
    const showPopupModal = jest.fn();
    const onActionSelection =jest.fn();
    const hidePopupModal =jest.fn();
    const generateLinkToken=jest.fn();
    const paginationHandler =jest.fn();
    const DeleteHandler =jest.fn();
    const totalRecords = 10;
     const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const account = render(<Provider store={store}>
      <LinkedAccounts />
      <RdsSearch placeholder={""} size={""} onChange={handleSearchChange}/>
      <RdsButton onClick={() => { showPopupModal();}}/>
      <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false} onActionSelection={onActionSelection} onPaginationHandler={paginationHandler} totalRecords={totalRecords}/>
      <RdsCompAlertPopup alertID={"alert_popup"} onCancel={hidePopupModal} onSuccess={generateLinkToken}/>
      <RdsCompAlertPopup alertID={"delete_modal"} onSuccess={DeleteHandler}/>
    </Provider>);
    expect(account).toMatchSnapshot();
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
