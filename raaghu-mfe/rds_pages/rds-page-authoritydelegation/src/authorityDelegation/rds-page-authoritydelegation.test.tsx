import React from "react";
import "@testing-library/jest-dom";
import {render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import { RdsButton, RdsDatePicker, RdsLabel, RdsNavtabs, RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import AuthorityDelegation from "./AuthorityDelegation";
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

describe("Authority Delegation page", () => {
  it("renders Authority Delegation page correctly", async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <AuthorityDelegation />
    </Provider>);
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[label="Delegate New User"]');
    document.querySelector('[title="Delegate New User"]');
    document.querySelector('[name="myDelegateUser"]');
    document.querySelector('[name="delegateUser"]');
  });

  it("Check Authority Delegation Page functionality", async () => {
    const pageNavtabsItems = [
      {
        id: "authorityDelegation",
        label: "Authority Delegation",
        order: 1,
        url: "/authoritydelegation",
      },
      {
        id: "permissionTree",
        label: "Permission Tree",
        order: 2,
        url: "/permissiontree",
      },
    ];
    const setActivePageId = jest.fn();
    const mockDispatch = jest.fn();
    const handleCloseOffcanvas = jest.fn();
    const tableHeadersDelegateUsers = {
      id: "delegateUser",
      label: "Delegate User",
      order: 1,
      type: "string",
      width: "20%",
      displayName: "Delegate User",
      key: "delegateUser",
      datatype: "string",
    };
    const filteredDelegateUserTable = [
      {
        delegateUser: "User1",
      },
      {
        delegateUser: "User2",
      },
    ];
    const handlerActions = jest.fn();
    const onDelegateDateRangeSelect = jest.fn();
    const handlerDelegateNewUser = jest.fn();
    const handlerDeleteConfirm = jest.fn();
    const tableHeadersMyDelegateUsers = {
      id: "myDelegateUser",
      label: "My Delegate User",
      order: 1,
      type: "string",
      width: "20%",
      displayName: "My Delegate User",
      key: "myDelegateUser",
      datatype: "string",
    };
    const myDelegateUserTable = [
      {
        myDelegateUser: "User1",
      },
      {
        myDelegateUser: "User2",
      },
    ];
    const handleSearchChange = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const authority = render(<Provider store={store}>
      <AuthorityDelegation />
      <RdsNavtabs
        navtabsItems={pageNavtabsItems.map(item => ({
          ...item,
          label: item.label,
          id: item.id
        }))}
        type="tabs"
        activeNavtabOrder={(activeNavTabId) => {setActivePageId(activeNavTabId);}}
      />
      <RdsSearch placeholder={"Search"} size={"small"}  onChange={(e) =>handleSearchChange(e, "delegateUser") }/>
      <RdsButton label="Delegate New User"  onClick={handleCloseOffcanvas}/>
      <RdsCompDatatable tableHeaders={[tableHeadersDelegateUsers]} tableData={[filteredDelegateUserTable]} pagination={false}  onActionSelection={handlerActions}/>
      <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"delegateNewUser"} canvasTitle={"Delegate New User"} onClose={handleCloseOffcanvas}  onclick={handleCloseOffcanvas}/>
      <RdsLabel label="AbpAccount.DelegationDateRange"/>
      <RdsDatePicker isDropdownOpen={false} customDate={onDelegateDateRangeSelect}/>
      <RdsButton label="AbpUi.Cancel" onClick={handleCloseOffcanvas}/>
      <RdsButton label="AbpUi.Save"  onClick={handlerDelegateNewUser}/>
      <RdsCompAlertPopup alertID={"authDel-delete-off"} onSuccess={handlerDeleteConfirm}/>
      <RdsSearch placeholder={"Search"} size={""} onChange={(e) =>
                                  handleSearchChange(e, "myDelegateUser")
                                }/>
      <RdsCompDatatable tableHeaders={[tableHeadersMyDelegateUsers]} tableData={[myDelegateUserTable]} pagination={false}/>
    </Provider>);
    expect(authority).toMatchSnapshot();
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