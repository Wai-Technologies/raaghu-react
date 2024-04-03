import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import Pages from "./pages";
import { RdsAlert, RdsButton, RdsInput, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompNewPage, RdsCompPages } from "../../../rds-components";
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
  RdsCompNewPage: jest.fn(),
  RdsCompPages: jest.fn(),
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
        <Pages />
      </Provider>
    );
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[label="CmsKit.NewPage"]');
    document.querySelector('[canvasTitle="Edit Page"]');
  });

it("Check Page not found page", () => {
  const createNewCanvasFn = jest.fn();
  const handlerCloseOffcanvas = jest.fn();
  const onDataFilter = jest.fn();
  const submitHandler = jest.fn();
  const tableHeaders = { displayName: "Name", key: "name", datatype: "string" };
  const onActionHandler = jest.fn();
  const onEditHandler = jest.fn();
  const editClaimData = { name: "test", description: "test" };
  const onDeleteHandler = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const page = render(
    <Provider store={store}>
      <Pages />
      <RdsInput placeholder="Search" onChange={onDataFilter}/>
      <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"page-new-off"} canvasTitle={"CmsKit.NewPage"} onClose={handlerCloseOffcanvas} />
      <RdsButton label="CmsKit.NewPage" onClick={(e: any) => createNewCanvasFn(e)}/>
      <RdsCompNewPage  onSubmit={submitHandler} onCancel={handlerCloseOffcanvas}/>
      <RdsCompPages tableHeaders={[tableHeaders]} onActionSelection={onActionHandler}/>
      <RdsAlert alertmessage={""} colorVariant={""} />
      <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"page-edit-off"} canvasTitle={"Edit Page"} />
      <RdsCompNewPage onSubmit={onEditHandler} newPageData={editClaimData}/>
      <RdsCompAlertPopup alertID={"page-delete-off"}  onSuccess={onDeleteHandler}/>
    </Provider>
  );
  expect(page).toMatchSnapshot();
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
