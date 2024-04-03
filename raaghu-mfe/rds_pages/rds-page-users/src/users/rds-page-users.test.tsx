import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Users from "./users";
import { RdsButton, RdsCheckbox, RdsDatePicker, RdsInput, RdsNavtabs, RdsOffcanvas, RdsSearch, RdsSelectList } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompPermissionTree, RdsCompPermissionTreeNew, RdsCompSetPassword, RdsCompUserBasics, RdsCompUserRoles } from "../../../rds-components";

// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
    filter: jest.fn(),
    forEach: jest.fn(),
  }));

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
    RdsDatePicker : jest.fn(),
    RdsDropdownList : jest.fn(),
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
    RdsCompIdentityManagement: jest.fn(),
    RdsCompEmail : jest.fn(),
    RdsCompAccount : jest.fn(),
    RdsCompFeatures : jest.fn(),
    RdsCompIdentityOauthManagement  : jest.fn(),
    RdsCompTenantInformation : jest.fn(),
    RdsCompDatabaseConnection : jest.fn(),
    RdsCompSetPassword : jest.fn(),
    RdsCompPermissionTree : jest.fn(),
    RdsCompPermissionTreeNew : jest.fn(),
    RdsCompUserBasics : jest.fn(),
    RdsCompUserRoles : jest.fn(),
    
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
  describe("User Page", () => {
it("renders User page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Users />
        </Provider>
    );
    document.querySelector('[placeholder="Search"]');
        document.querySelector('[placeholder="Select Roles"]');
        document.querySelector('[placeholder="Select organization Unit"]');
        document.querySelector('[button="AbpIdentity.NewUser"]');

});

it("Check the user page with functions", () => {
    const handleSearchChange = jest.fn();
    const setSearch = jest.fn();
    const rolesItem = { option: null, value: "value", label: "label" };
    const organizationItem = { option: null, value: "value", label: "label" };
    const handleButtonClick = jest.fn();
    const tableHeaders = { displayName: "option 1", key: "1", datatype: "string" };
    const tableData = { data: "option 2", key: "2" };
    const onActionSelection = jest.fn();
    const paginationHandler = jest.fn();
    const deleteHandler = jest.fn();
    const offcanvasClose = jest.fn();
    const navtabsItems = { option: null, value: "value", label: "text", id: "1" };
    const setActiveNavTabId = jest.fn();
    const getUserData = jest.fn();
    const userRolesData = { data: "option 2", key: "2" };
    const handleRoleNamesData = jest.fn();
    const organizationUnit = { data: "test", key: "2" };
    const handleOrganizationUnit = jest.fn();
    const createNewUser = jest.fn();
    const offCanvasHandler = jest.fn();
    const navtabsItemsEdit = { option: null, value: "value", label: "text", id: "1" };
    const handleUserUpdate = jest.fn();
    const handlerSetPassword = jest.fn();
    const setSelectedData = jest.fn();
    const allClaimsArray = { option: null, value: "value", label: "text", id: "1" };
    const createNewClaim = jest.fn();
    const tableHeadersClaim = { displayName: "option 1", key: "1", datatype: "string" };
    const claimsTable = { data: "option 2", key: "2" };
    const onActionSelectionClaims = jest.fn();
    const handlerClaim = jest.fn();
    const handlerLockoutEndDateData = jest.fn();
    const handlerLockoutEndDate = jest.fn();
    const userPermission = { data: "test", key: "2" };
    const handleEditedPermissions = jest.fn();
    const handlerPermission = jest.fn();
    const setIsEnabledData = jest.fn();
    const handleTwoFactorSubmit = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const user = render(
        <Provider store={store}>
            <Users />
            <RdsSearch placeholder="Search" size="small" onChange={handleSearchChange}/>
            <RdsSelectList selectItems={[rolesItem]} id={"AbpIdentity.Fea"} placeholder="Select Roles" onChange={(item: any) => {setSearch({ roleId: item.value });}}/>
            <RdsSelectList placeholder="Select organization Unit" id="selectOrgUnit"  selectItems={[organizationItem]} onChange={(item: any) => {organizationUnitId: item.value}}/>
            <RdsCheckbox label={"Lock"} checked={true} onChange={(e: any) => {e.target.checked}}/>
            <RdsCheckbox label={"Not Active"} checked={true} onChange={(e: any) => {e.target.checked}}/>
            <RdsButton label="AbpIdentity.NewUser"  onClick={handleButtonClick}/>
            <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[tableData]} pagination={true}  onActionSelection={onActionSelection} onPaginationHandler={paginationHandler}/>
            <RdsCompAlertPopup alertID={"user-delete-off"} onSuccess={deleteHandler}/>
            <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"userOffcanvas"} canvasTitle={"AbpIdentity.NewUser"}  onClose={offcanvasClose}/>
            <RdsNavtabs navtabsItems={[navtabsItems]} type={"tabs"} activeNavtabOrder={(currId) => {setActiveNavTabId(currId);}}/>
            <RdsCompUserBasics createUser={(e: any) => {getUserData(e);}}/>
            <RdsCompUserRoles usersRole={userRolesData}  changedData={(data: any) => {handleRoleNamesData(data);}}/>
            <RdsCompPermissionTreeNew treeData={organizationUnit} changeData={handleOrganizationUnit}/>
            <RdsButton label="AbpUi.Cancel" onClick={offcanvasClose}/>
            <RdsButton label="AbpUi.Save" onClick={createNewUser}/>
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"user-edit-off"} canvasTitle={"Edit User"}  onclick={offCanvasHandler}  onClose={(e) => {offcanvasClose();}}/>
            <RdsNavtabs navtabsItems={[navtabsItemsEdit]} type={"tabs"} activeNavtabOrder={(currTab) => {setActiveNavTabId(currTab);}}/>
            <RdsCompUserBasics  createUser={(e: any) => {getUserData(e);}}/>
            <RdsCompUserRoles usersRole={userRolesData}  changedData={(data: any) => {handleRoleNamesData(data);}}/>
            <RdsCompPermissionTreeNew treeData={organizationUnit} changeData={handleOrganizationUnit}/>
            <RdsButton onClick={handleUserUpdate} label="AbpUi.Save"/>
            <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"set_password"} canvasTitle={"AbpIdentity.SetPassword"} onclick={offCanvasHandler}/>
            <RdsCompSetPassword onSaveHandler={handlerSetPassword}/>
            <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"claims-off"} canvasTitle={"Claims"} />
            <RdsSelectList selectItems={[allClaimsArray]} id={"abp.claim"} label="AbpIdentity.ClaimTypes"  onChange={(item: any) => {setSelectedData({claimType: item.value,});}}/>
            <RdsInput label="AbpIdentity.ClaimValue" onChange={(event) =>setSelectedData({claimValue: event.target.value})}/>
            <RdsButton onClick={(event) => createNewClaim(event)}/>
            <RdsCompDatatable tableHeaders={[tableHeadersClaim]} tableData={[claimsTable]} pagination={false}  onActionSelection={onActionSelectionClaims}/>
            <RdsButton label="AbpUi.Save"  onClick={handlerClaim}/>
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"lock-off"} canvasTitle={"Lock"} />
            <RdsDatePicker isDropdownOpen={false}  onDatePicker={handlerLockoutEndDateData} DatePickerLabel="Lockout End Date"/>
            <RdsButton label="AbpUi.Save" onClick={() => handlerLockoutEndDate()}/>
            <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"permission-off"} canvasTitle={"Permission"} />
            <RdsCompPermissionTree permissions={[userPermission]} editedPermissions={handleEditedPermissions}/>
            <RdsButton label="AbpUi.Save" onClick={handlerPermission}/>
            <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"two-Factor-off"} canvasTitle={"Two factor"} />
            <RdsCheckbox label={"AbpAccount.DisplayName:TwoFactorEnabled"} checked={undefined}  onChange={(e: any) => {setIsEnabledData(e.target.checked);}}/>
            <RdsButton label="AbpUi.Save"  onClick={() => handleTwoFactorSubmit}/>
        </Provider>
    );
    expect(user).toMatchSnapshot();
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