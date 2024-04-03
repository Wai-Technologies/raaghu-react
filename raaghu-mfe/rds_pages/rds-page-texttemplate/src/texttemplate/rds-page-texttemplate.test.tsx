import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import TextTemplate from "./text-template";
import { RdsCompDatatable } from "../../../rds-components";
import { RdsButton, RdsLabel, RdsOffcanvas, RdsSelectList, RdsTextArea } from "../../../../../raaghu-elements/src";

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
    RdsTextArea : jest.fn(),
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
  describe("texttemplate Page", () => {
it("renders texttemplate page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <TextTemplate />
        </Provider>
    );
        document.querySelector('[label="TextTemplateManagement.Name"]');
        document.querySelector('[label="TextTemplateManagement.TemplateContent"]');
        document.querySelector('[button="AbpUi.Cancel"]');
        document.querySelector('[button="TextTemplateManagement.RestoreToDefault"]');
        document.querySelector('[button="AbpUi.Save"]');

});

it("Check texttemplate page with functionalty", () => {
  const tableHeaders = {
    key: "id",
    label: "TextTemplateManagement.Id",
    sortable: true,
  };
  const tableData = {
    id: "1",
    name: "test",
    templateContent: "test",
  };
  const onActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const setReferenceContent = jest.fn();
  const restoreDefaultContent = jest.fn();
  const onCloseFn = jest.fn();
  const handlerEditSave = jest.fn();
  const languages = {
    value: "en",
    label: "English",
    option:"option1"
  };
  const handleRefChange = jest.fn();
  const setTargetContent = jest.fn();
  const restoreDefault = jest.fn();
  const handlerCustomise = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const text = render(
      <Provider store={store}>
          <TextTemplate />
          <RdsCompDatatable tableHeaders={[{ ...tableHeaders, displayName: "", datatype: "" }]} tableData={[tableData]} pagination={true} onActionSelection={onActionSelection}  onPaginationHandler={paginationHandler}/>
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"text-temp-edit-off"} canvasTitle={"TextTemplateManagement.Contents"} />
          <RdsLabel label="TextTemplateManagement.Name"/>
          <RdsTextArea placeholder={""} onChange={(e: any) => setReferenceContent(e.target.value)} rows={10}/>
          <RdsButton label="TextTemplateManagement.RestoreToDefault"  onClick={restoreDefaultContent}/>
          <RdsButton label="AbpUi.Cancel"  onClick={(e: any) => onCloseFn(e)} databsdismiss="offcanvas"/>
          <RdsButton label="AbpUi.Save" onClick={(e: any) => handlerEditSave(e)}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"cust-per-cult"} canvasTitle={"TextTemplateManagement.CustomizePerCulture"} />
          <RdsLabel label="TextTemplateManagement.Name"/>
          <RdsSelectList selectItems={[languages]} id={"text.base"} label="TextTemplateManagement.BaseCultureName"  onChange={(item: any) => handleRefChange(item.value, "ref", "selectedTargetCulture")}/>
          <RdsTextArea placeholder={""}  onChange={(e: any) => setReferenceContent(e.target.value)} label="TextTemplateManagement.BaseContent"/>
          <RdsSelectList selectItems={[languages]} id={"baseTe"} label="extTemplateManagement.TargetCultureName" onChange={(item: any) => handleRefChange(item.value, "target", "selectedTargetCulture")}/>
          <RdsTextArea placeholder={""} onChange={(e: any) => setTargetContent(e.target.value)} label="TextTemplateManagement.TargetContent"/>
          <RdsButton label="TextTemplateManagement.RestoreToDefault"  onClick={restoreDefault}/>
          <RdsButton label="AbpUi.Cancel" onClick={(e: any) => onCloseFn(e)}/>
          <RdsButton label="AbpUi.Save" onClick={(e: any) => handlerCustomise(e)}/>
      </Provider>
  );
  expect(text).toMatchSnapshot();
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