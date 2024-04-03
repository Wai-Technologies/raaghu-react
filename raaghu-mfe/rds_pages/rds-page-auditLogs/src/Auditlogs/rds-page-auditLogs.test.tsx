import React from "react";
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management/index";
import Auditlogs from "./Auditlogs";
import { RdsBadge, RdsDatePicker, RdsDropdownList, RdsInput, RdsLabel, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompDatatable } from "../../../rds-components";

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
  RdsNavtabs:jest.fn(),
  RdsDatePicker:jest.fn(),
  RdsDropdownList:jest.fn(),
  RdsInput:jest.fn(),
  ViewOperationLogsOffCanvas:jest.fn(),
  ActionOperationLogsOffCanvas:jest.fn(),
  RdsBadge:jest.fn(),
  RdsLabel:jest.fn(),
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
    // Mock the useDispatch hook
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Auditlogs />
      </Provider>
    );
    document.querySelector('[placeholder="Search by URL"]');

  });

  it("Checks elememts and components behaviour", async () => {
    const onAuditDateSelectFilter = jest.fn();
    const onUrlFilter = jest.fn();
    const onEntityFullNameFilter = jest.fn();
    const onEntityActionSelection = jest.fn();
    const entityPagepaginationHandler = jest.fn();
    const auditHeaders = {
      displayName: "Header Name",
      key: "headerKey",
      datatype: "string",
    };
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const auditLogs =render(
      <Provider store={store}>
        <Auditlogs />
        <RdsNavtabs navtabsItems={[{ label: "AbpAuditLogging.AuditLogs", id: "0" }]} type={"tabs"} />
        <RdsDatePicker isDropdownOpen={false} customDate={onAuditDateSelectFilter}/>
        <RdsDropdownList listItems={[{ label: "100 - Continue", val: "100", icon: undefined, iconWidth: undefined, iconHeight: undefined, iconPath: undefined }]} />
        <RdsInput inputType="text"  placeholder={"Search by URL"} labelPosition="top" size="small" onChange={onUrlFilter}></RdsInput>
        <RdsCompDatatable tableHeaders={[auditHeaders]} tableData={[]} pagination={false}  onActionSelection={onEntityActionSelection}  onPaginationHandler={entityPagepaginationHandler}/>
        <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"auditLogs"} canvasTitle={"AbpAuditLogging.Detail"} />
        <RdsInput  onChange={onEntityFullNameFilter}/>
        <RdsBadge label={""}  />
        <RdsLabel />
     </Provider>
    );
    expect(auditLogs).toMatchSnapshot();
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
