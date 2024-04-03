import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Blogger from "./blogger";
import configureMockStore from "redux-mock-store";
import { RdsButton, RdsInput, RdsOffcanvas, RdsTextArea } from "../../../rds-elements";
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
  RdsInput: jest.fn(),
  RdsTextArea: jest.fn(),
  RdsSelect: jest.fn(),
  RdsCheckbox: jest.fn(),
  RdsRadio: jest.fn(),
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn()
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
describe("Blogger page", () => {
  it("renders Blogger page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <Blogger />
    </Provider>);
    document.querySelector('[button="New Blog"]');
    document.querySelector('[placeholder="Enter Name"]');
    document.querySelector('[placeholder="Enter Short Name"]');
    document.querySelector('[placeholder="Enter Description"]');

  });

  it("check elements and components are rendered", () => {
    const createBlogFn = jest.fn();
    const saveUpdateBlog = jest.fn();
    const paginationHandler = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const blogger = render(<Provider store={store}>
      <Blogger />
      <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"blogger-edit-off"} canvasTitle={"New Blog"} />
      <RdsButton onClick={createBlogFn} label="New Blog" />
      <RdsInput label="Blogging.Name" placeholder="Enter Name" />
      <RdsInput label="Blogging.ShortName" placeholder="Enter Short Name" />
      <RdsTextArea placeholder={"Enter Description"} label="Blogging.Description" />
      <RdsButton  onClick={(event) => saveUpdateBlog(event)}/>
      <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false} onPaginationHandler={paginationHandler}/>
      <RdsCompAlertPopup alertID={"blogger-clear-off"} />
    </Provider>);
    expect(blogger).toMatchSnapshot();
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