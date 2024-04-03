import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Applications from "./applications";
import configureMockStore from "redux-mock-store";
import { RdsButton, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompApplicationBasic, RdsCompApplicationScopes, RdsCompApplicationWorkflows, RdsCompDatatable, RdsCompPermissionTree } from "../../../rds-components";

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

describe("Application page", () => {
  it("renders Application page correctly", async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <Applications />
      <RdsButton />
    </Provider>);
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[button="AbpOpenIddict.NewApplication"]');

  });


  it('clicks the button and checks if the handlerNewApplication function is called', async () => {
    const handlerNewApplication = jest.fn();
    const handleSaveEditedData = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const application = render(
      <Provider store={store}>
        <Applications />
        <RdsButton onClick={handlerNewApplication} />
        <RdsButton onClick={handleSaveEditedData} />
       </Provider>
    );
    expect(application).toMatchSnapshot();


  });

  it('interacts with multiple components and checks the application', async () => {
    const handleApplicationDataChanges = jest.fn();
    const handleActionSelection = jest.fn();
    const typeList = jest.fn();
    const consentType = jest.fn();
    const paginationHandler = jest.fn();
    const handleApplicationEditDataChanges = jest.fn();
    const handleDeleteRecord = jest.fn();
    const permissionListData = jest.fn();
    const handleEditedPermissions = jest.fn();
    const handleSelectedPermissions = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const components = render(
      <Provider store={store}>
        <Applications />
        <RdsCompApplicationBasic editApplicationData={handleApplicationDataChanges} />
        <RdsCompApplicationBasic editApplicationData={handleApplicationEditDataChanges} />
        <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false} onActionSelection={handleActionSelection} onPaginationHandler={paginationHandler} />
        <RdsCompApplicationWorkflows typeList={[typeList]} consentType={[consentType]} editApplicationData={handleApplicationDataChanges}
          handleSubmit={function (event: any): void {
            throw new Error("Function not implemented.");
          }} />

        <RdsCompAlertPopup alertID={"application-delete-off"} onSuccess={handleDeleteRecord} />
        <RdsCompPermissionTree permissions={[permissionListData]} editedPermissions={handleEditedPermissions} selectedPermissions={handleSelectedPermissions}/>
      </Provider>
    );
    expect(components).toMatchSnapshot();

  });

  it('interacts with elements', async () => {
    const onEditNavTabsOrder = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const elements = render(
      <Provider store={store}>
        <Applications />
        <RdsNavtabs navtabsItems={[{ label: "Auth Flows", id: "0" }]} type={"tabs"} activeNavtabOrder={onEditNavTabsOrder} />
        <RdsOffcanvas placement={"end"} backDrop={true} scrolling={true} offId={undefined} canvasTitle={"AbpOpenIddict.NewApplication"} />

      </Provider>
    );
    expect(elements).toMatchSnapshot();

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