import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../libs/state-management";
import Menus from "./menus";
import { RdsCompAlertPopup, RdsCompOrganizationTree } from "../../../rds-components";
import { RdsOffcanvas } from "../../../rds-elements";
import RdsCompNewMenu from "../../../../../raaghu-components/src/rds-comp-new-menu/rds-comp-new-menu";

// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
  filter: jest.fn(),
  forEach: jest.fn(),
}));

// Mock necessary dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock("../../../../../raaghu-components/src/rds-comp-new-menu/rds-comp-new-menu", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked RdsCompNewMenu</div>),
}));

jest.mock("../../../rds-elements", () => ({
  RdsOffcanvas: jest.fn(() => <div>Mocked RdsOffcanvas</div>),
}));

jest.mock("../../../../../raaghu-components/src/rds-comp-alert-popup/rds-comp-alert-popup", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked RdsCompAlertPopup</div>),
}));

jest.mock("../../../../libs/state-management/public.api", () => ({
  __esModule: true,
  deleteMenuItem: jest.fn(),
  postMenuItems: jest.fn(),
  editMenuItem: jest.fn(),
  getAllMenuItems: jest.fn(() => () => Promise.resolve({ data: 'mock data' })),  // Mock the async dispatch
  fetchPages: jest.fn(),
}));

// Mock localStorage getItem method
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

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
  RdsOffcanvas:jest.fn(),
  RdsCompLogin : jest.fn(),
  RdsCompOrganizationTree : jest.fn(),
  RdsCompNewMenu : jest.fn(),
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
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));


global.localStorage = localStorageMock;

describe("Menus Component", () => {
  it("renders Menus component correctly", async () => {
    render(
      <Router>
        <Provider store={store}>
          <Menus />
        </Provider>
      </Router>
    );
document.querySelector('[buttonLabel="NEW ROOT MENU"]');
document.querySelector('[canvasTitle="NEW ROOT MENU"]');
document.querySelector('[canvasTitle="SUB ROOT MENU"]');


    // Wait for the async dispatch to resolve
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it("Check menu page functionality", async () => {
    const handlerDeleteMenu = jest.fn();
    const handlerAddSubMenu = jest.fn();
    const handlerEditMenu = jest.fn();
    const nodeColor = {
      color: "red",
      textColor: "white",
    };
    const pageData = {
      id: "1",
      name: "Page 1",
      children: [
        {
          id: "2",
          name: "Page 2",
          children: [
            {
              id: "3",
              name: "Page 3",
              children: [],
            },
          ],
        },
      ],
    };
    const handlerCloseOffcanvas = jest.fn();
    const handlerSaveAddRootMenu = jest.fn();
    const menusData = {
      id: "1",
      name: "Page 1",
      children: [
        {
          id: "2",
          name: "Page 2",
          children: [
            {
              id: "3",
              name: "Page 3",
              children: [],
            },
          ],
        },
      ],
    };
    const handlerDeleteConfirm = jest.fn();
    const handlerSaveAddSubMenu = jest.fn();
    const handlerSaveEditMenu = jest.fn();
    const Data = {};
  const menu =  render(
      <Router>
        <Provider store={store}>
          <Menus />
          <RdsCompOrganizationTree nodeColor={[nodeColor]} organizationTreeData={[pageData]} mutable={false}  onDeleteNode={handlerDeleteMenu}  onCreateSubUnit={handlerAddSubMenu}
                                        onNodeEdit={handlerEditMenu}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"doganization"} canvasTitle={"NEW ROOT MENU"}  onClose={handlerCloseOffcanvas}/>
          <RdsCompNewMenu
          onSubmit={handlerSaveAddRootMenu}
          menusData={menusData}
          onCancel={handlerCloseOffcanvas} menuPage={[]}/>
        <RdsCompAlertPopup alertID={"deleteTreeNode"} onSuccess={handlerDeleteConfirm}/>
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"aoganization"} canvasTitle={"SUB ROOT MENU"}  onClose={handlerCloseOffcanvas}/>
        <RdsCompNewMenu
          onSubmit={handlerSaveAddSubMenu}
          menusData={menusData}
          onCancel={handlerCloseOffcanvas} menuPage={[]} />
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"boganization"} canvasTitle={"SUB ROOT MENU"}  onClose={handlerCloseOffcanvas} />
          <RdsCompNewMenu  onSubmit={handlerSaveEditMenu} menusData={Data} onCancel={handlerCloseOffcanvas} menuPage={[]} />
        </Provider>
      </Router>
    );
    expect(menu).toMatchSnapshot();
  });
});
