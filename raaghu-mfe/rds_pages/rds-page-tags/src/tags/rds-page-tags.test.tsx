import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Tags from "./tags";
import { RdsButton, RdsInput, RdsOffcanvas, RdsSelectList } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";

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
    RdsCompFeatureManagement : jest.fn(),
    RdsCompCMS : jest.fn(),
    RdsCompAccountExternalProvider : jest.fn(),
    RdsCompIdentityLdapManagement : jest.fn(),
    RdsCompIdentityOauthManagement  : jest.fn(),
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
  describe("Tags Page", () => {
it("renders Tags page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Tags />
        </Provider>
    );
});

it("Check tags page functionality", () => {
    const mockDispatch = jest.fn();
    const handlerCloseOffcanvas = jest.fn();
    const createTagFn = jest.fn();
    const setTagsObj = jest.fn();
    const entityTypeList = {
        value: "value",
        label: "label",
        option: "option",
    };
    const saveUpdateTags = jest.fn();
    const setEditBody = jest.fn();
    const editTags = jest.fn();
    const tableHeaders = { displayName: "Display Name", key: "key", datatype: "string", label: "Label" };
    const tableData = {
        key: "key",
        label: "label",
    };
    const onActionSelection = jest.fn();
    const paginationHandler = jest.fn();
    const confirmDelete = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const tags = render(
        <Provider store={store}>
            <Tags />
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"tag-edit-off"} canvasTitle={"CmsKit.NewTag"} onClose={handlerCloseOffcanvas}/>
            <RdsButton label="CmsKit.NewTag"  onClick={createTagFn}/>
            <RdsSelectList selectItems={[entityTypeList]} id={"EntityType"} placeholder="Select Entity Type" label="CmsKit.EntityType"  onChange={(value: any) =>setTagsObj}/>
            <RdsInput label="CmsKit.Name" placeholder="Enter Name" onChange={(event) =>setTagsObj({ name: event.target.value })}/>
            <RdsButton label="AbpUi.Cancel"  onClick={handlerCloseOffcanvas}/>
            <RdsButton label="AbpUi.Save" databsdismiss="offcanvas" onClick={() => saveUpdateTags}/>
            <RdsInput label="CmsKit.Name" placeholder="Enter Name" onChange={(event) =>setEditBody({name: event.target.value })}/>
            <RdsButton label="AbpUi.Save" onClick={(event) => editTags(event)}/>
            <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[tableData]} pagination={true} onActionSelection={onActionSelection} onPaginationHandler={paginationHandler}/>
            <RdsCompAlertPopup alertID={"tag-delete-off"}  onSuccess={confirmDelete}/>
        </Provider>
    );
    expect(tags).toMatchSnapshot();
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