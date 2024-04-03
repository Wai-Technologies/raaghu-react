import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import OrganizationTree from "./Organization-Tree";
import { RdsAlert, RdsButton, RdsIcon, RdsInput, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompOrganizationTree } from "../../../rds-components";
// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
  filter: jest.fn(),
  forEach: jest.fn(),
  // Add any other lodash functions that you are using in your code
}));
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
  RdsCheckbox: jest.fn(),
  RdsIcon: jest.fn(),
  RdsInput: jest.fn(),
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompProfilePicture: jest.fn(),
  RdsCompPersonalInfo: jest.fn(),
  RdsCompChangePassword: jest.fn(),
  RdsCompOrganizationTree: jest.fn(),
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
describe("Organization page", () => {
  it("renders organization page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <OrganizationTree />
      </Provider>
    );
    document.querySelector('[name="AbpIdentity.OrganizationTree"]');
    document.querySelector('[button="NEW ROOT UNIT"]');
    document.querySelector('[button="AbpIdentity.NewRole"]');
    document.querySelector('[canvasTitle="Select Member"]');
  });

it("Check organization page data", () => {
  const mockDispatch = jest.fn();
  const nodeColor = {
    color: "red",
    borderColor: "black",
  };
  const oData = {
    id: 1,
    parentId: 0,
    code: "code",
    displayName: "displayName",
    children: [],
  };
  const handlerDeleteNode = jest.fn();
  const handlerCreateSubUnit = jest.fn();
  const handlerSelectNode = jest.fn();
  const handlerNodeEdit = jest.fn();
  const handlerNewUser = jest.fn();
  const handlerNewRoles = jest.fn();
  const navtabsItems=
    {
      label: "Label 1",
      id: "1",
      value: "Value 1",
    };
    const handlerMemberActions = jest.fn();
    const handlerRoleActions = jest.fn();
    const tableHeadersMembers = { displayName: "Label 1", key: "1", datatype: "Value 1" };
    const tableHeadersRoles = { displayName: "Label 2", key: "2", datatype: "Value 2" };
    const handlerUserSelect = jest.fn();
    const handlerCloseOffcanvas = jest.fn();
    const handlerUserPush = jest.fn();
    const handlerRoleSelect = jest.fn();
    const handlerRolePush = jest.fn();
    const handlerAddNestedNode = jest.fn();
    const handlerEdit = jest.fn();
    const setVal = jest.fn();
    const handlerAddSubUnitNode = jest.fn();
    const handlerAddRootNode = jest.fn();
    const handlerDeleteConfirm = jest.fn();
    const handlerDeleteConfirmUserRoles = jest.fn();
    const inputReset =true;
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const org = render(
    <Provider store={store}>
      <OrganizationTree />
      <RdsAlert alertmessage={""} colorVariant={""} />
      <RdsCompOrganizationTree nodeColor={[nodeColor]} organizationTreeData={[oData]} mutable={false}  onDeleteNode={handlerDeleteNode} onCreateSubUnit={handlerCreateSubUnit} onSelectNode={handlerSelectNode} onNodeEdit={handlerNodeEdit}  buttonLabel="NEW ROOT UNIT"/>
      <RdsIcon />
      <RdsButton label="New Member"  onClick={handlerNewUser} data-bs-dismiss="offcanvas"/>
      <RdsButton label="AbpIdentity.NewRole"  onClick={handlerNewRoles} />
      <RdsNavtabs navtabsItems={[navtabsItems]} type={"tabs"}/>
      <RdsCompDatatable tableHeaders={[tableHeadersMembers]} tableData={[]} pagination={false} onActionSelection={handlerMemberActions}/>
      <RdsCompDatatable tableHeaders={[tableHeadersRoles]} tableData={[]} pagination={false}  onActionSelection={handlerRoleActions}/>
      <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"oMember-add-off"} canvasTitle={"Select Member"} />
      <RdsCompDatatable tableHeaders={[tableHeadersMembers]} tableData={[]} pagination={true} onRowSelect={handlerUserSelect}/>
      <RdsButton label="AbpUi.Cancel" onClick={handlerCloseOffcanvas} databsdismiss="offcanvas"/>
      <RdsButton label="AbpUi.Save" onClick={handlerUserPush} databsdismiss="offcanvas"/>
      <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"oRole-add-off"} canvasTitle={"AbpIdentity.SelectRoles"} />
      <RdsCompDatatable tableHeaders={[tableHeadersRoles]} tableData={[]} pagination={true}  recordsPerPage={10}  onRowSelect={handlerRoleSelect}/>
     <RdsButton label="AbpUi.Cancel" databsdismiss="offcanvas"/>
     <RdsButton label="AbpUi.Save" onClick={handlerRolePush}/>
     <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"aoganization"} canvasTitle={"AbpIdentity.NewOrganizationUnit"}  onClose={handlerCloseOffcanvas}/>
    <RdsInput label="AbpIdentity.Name" placeholder="Enter Name"  onChange={(e) => setVal(e.target.value)}/>
    <RdsButton label="AbpUi.Save"  onClick={handlerAddNestedNode}/>
    <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"boganization"} canvasTitle={"Edit Organization Unit"} />
    <RdsInput label="AbpIdentity.Name" placeholder="Enter Name" onChange={(e) => setVal(e.target.value)}/>
    <RdsButton label="AbpUi.Save"  onClick={handlerEdit}/>
    <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"coganization"} canvasTitle={"Add Organization Sub Unit"}  onClose={handlerCloseOffcanvas} />
    <RdsInput label="Organization Name" placeholder="Enter Organization Name" onChange={(e) => setVal(e.target.value)} reset={inputReset}/>
    <RdsButton  onClick={handlerAddSubUnitNode}/>
    <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"doganization"} canvasTitle={"Add Organization New Unit"} onClose={handlerCloseOffcanvas} />
    <RdsInput label="Organization Name" placeholder="Enter Organization Name" onChange={(e) => setVal(e.target.value)}/>
    <RdsButton label="AbpUi.Save"  onClick={handlerAddRootNode}/>
    <RdsCompAlertPopup alertID={"deleteTreeNode"}  onSuccess={handlerDeleteConfirm}/>
    <RdsCompAlertPopup alertID={"orgMemRole"} onSuccess={handlerDeleteConfirmUserRoles}/>
    </Provider>
  );
  expect(org).toMatchSnapshot();
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
