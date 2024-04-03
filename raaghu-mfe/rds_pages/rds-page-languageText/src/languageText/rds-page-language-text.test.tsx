import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import LanguageText from "./languageText";
import { RdsAlert, RdsButton, RdsOffcanvas, RdsSelectList, RdsTextArea } from "../../../rds-elements";
import { RdsCompDatatable } from "../../../rds-components";

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
  describe("Language Page", () => {
it("renders Language page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <LanguageText />
        </Provider>
    );
    document.querySelector('[placeholder="LanguageManagement.BaseValue"]');
    document.querySelector('[placeholder="LanguageManagement.Value"]');
    document.querySelector('[placeholder="LanguageManagement.ResourceName"]');
    document.querySelector('[placeholder="LanguageManagement.TargetValue"]');

});

it("check language page functionality", () => {
  const onChangeSelectList = jest.fn();
  const mockDispatch = jest.fn();
  const res = [{ option: "test", value: "1" }];
  const target = [{ option: "test", value: "1" }];
  const paginationHandler = jest.fn();
  const onActionSelection = jest.fn();
  const tableHeaders = [
    { displayName: "Header 1", key: "header1", datatype: "string" },
    { displayName: "Header 2", key: "header2", datatype: "string" },
  ];

  const tableData = [
    { header1: "Data 1", header2: "Data 2" },
  ];
  const onTextEdit = jest.fn();
  const onRestore = jest.fn();
  const SaveHandler = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  const languageText = render(
      <Provider store={store}>
          <LanguageText />
          <RdsSelectList
            selectItems={[{ option: "cultureList", value: "1" }]}
            id={"ement.Ba"}
            onChange={(item: any) => onChangeSelectList(item)}
          />
          <RdsSelectList  id="LangV" onChange={(item: any) => onChangeSelectList(item)}  selectItems={[{ option: "cultureList", value: "1" }]}/>
        <RdsSelectList  id="langR" selectItems={res}  onChange={(item: any) => onChangeSelectList(item)} />
        <RdsSelectList  id="langT" selectItems={target}  onChange={(item: any) => onChangeSelectList(item)} />
               <RdsCompDatatable
          tableHeaders={tableHeaders}
          tableData={tableData}
          pagination={true}
          onPaginationHandler={paginationHandler}
          onActionSelection={onActionSelection}
        />
        <RdsAlert alertmessage={"test the alert"} colorVariant={""} />
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"lang-text-off"} canvasTitle={"Edit Language"} />
        <RdsTextArea label="LanguageManagement.BaseValue" placeholder={""}/>
        <RdsTextArea label="LanguageManagement.TargetValue" placeholder={""} onChange={onTextEdit}/>
        <RdsButton label="LanguageManagement.RestoreToDefault"  onClick={onRestore}/>
        <RdsButton label="AbpUi.Cancel" databsdismiss="offcanvas"/>
        <RdsButton label="AbpUi.Save" onClick={SaveHandler}/>
      </Provider>

  );
expect(languageText).toMatchSnapshot();
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