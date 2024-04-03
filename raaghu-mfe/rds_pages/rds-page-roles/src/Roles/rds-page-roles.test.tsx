import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Roles from "./Roles";
import { RdsButton, RdsInput, RdsOffcanvas, RdsSearch } from "../../../../../raaghu-elements/src";
import { RdsCompAlertPopup, RdsCompClaims, RdsCompDatatable, RdsCompPermissionTree } from "../../../rds-components";

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
    RdsInput : jest.fn(),
    RdsIcon : jest.fn(),
    RdsCheckbox : jest.fn(),
    RdsSelectList : jest.fn(),
    RdsBadge : jest.fn(),
    RdsFabMenu : jest.fn(),
    RdsNavtabs : jest.fn(),
  })); 
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompForgotPassword: jest.fn(),
    RdsCompFormsEmail: jest.fn(),
    RdsCompIconList: jest.fn(),
    RdsCompNewLanguage: jest.fn(),
    RdsCompWebsiteLog: jest.fn(),
    RdsCompCache: jest.fn(),
    RdsCompPermissionTree: jest.fn(),
    RdsCompClaims: jest.fn(),
    RdsCompRoles: jest.fn(),
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
  describe("Roles Page", () => {
it("renders Roles page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Roles />
        </Provider>
    );
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[button="AbpIdentity.NewRole"]');
    document.querySelector('[placeholder="Enter Role Name"]');
    document.querySelector('[title="Edit Role"]');
  });

it("Check roles page functionality", () => {
  const handleSearchChange = jest.fn();
  const handlerNewRole = jest.fn();
  const handlerActions = jest.fn();
  const paginationHandler = jest.fn();
  const tableHeader = { title: "Role Name", dataIndex: "roleName", key: "roleName" };
  const setVal = jest.fn();
  const handlerAddRole = jest.fn();
  const handlerEditRole = jest.fn();
  const handleEditedPermissions = jest.fn();
  const permissionListData = {
    name: "AbpIdentity.Roles",
    displayName: "AbpIdentity.Roles",
    children: [
      {
        name: "AbpIdentity.Roles.Create",
        displayName: "AbpIdentity.Roles.Create",
      }
    ],
  };
  const handlerPermission = jest.fn();
  const claimDataHandler = jest.fn();
  const handlerClaim = jest.fn();
  const handlerDeleteConfirm = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  const roles = render(
      <Provider store={store}>
          <Roles />
          <RdsSearch placeholder="Search" onChange={handleSearchChange} size={"small"}/>
          <RdsButton label="AbpIdentity.NewRole" onClick={handlerNewRole}/>
          <RdsCompDatatable tableHeaders={[{ ...tableHeader, displayName: "Role Name", datatype: "string" }]} tableData={[]} pagination={false} onActionSelection={handlerActions} onPaginationHandler={paginationHandler}/>
          <RdsOffcanvas placement="top" backDrop={true} scrolling={true} offId="newRole" canvasTitle="AbpIdentity.NewRole" onClose={handlerNewRole}/>
          <RdsInput label="AbpIdentity.NewRole" placeholder="Enter Role Name" onChange={(e: any) => setVal(e.target.value)}/>
          <RdsButton label="AbpUi.Cancel" onClick={handlerNewRole} databsdismiss="offcanvas"/>
          <RdsButton label="AbpUi.Save" onClick={handlerAddRole}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-edit-off"} canvasTitle={"Edit Role"} />
          <RdsInput label="AbpIdentity.RoleName" onChange={(e: any) => setVal(e.target.value)}/>
          <RdsButton label="AbpUi.Save" onClick={handlerEditRole}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-permissions-off"} canvasTitle={"Permission"} />
          <RdsCompPermissionTree permissions={[permissionListData]} editedPermissions={handleEditedPermissions}/>
          <RdsButton label="AbpUi.Save" onClick={handlerPermission}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-claims-off"} canvasTitle={"Claims"} />
          <RdsCompClaims getEditClaimData={claimDataHandler}/>
          <RdsButton label="AbpUi.Save" onClick={handlerClaim}/>
          <RdsCompAlertPopup alertID={"role-delete-off"} onSuccess={handlerDeleteConfirm}/>
      </Provider>
  );
  expect(roles).toMatchSnapshot();
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