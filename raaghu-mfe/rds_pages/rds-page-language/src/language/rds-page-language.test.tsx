import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Language from "./language";
import { RdsAlert, RdsButton, RdsCheckbox, RdsInput, RdsOffcanvas, RdsSelectList } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompNewLanguage } from "../../../rds-components";

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
            <Language />
        </Provider>
    );
});

it("Check Language page", () => {
  const handleSearchChange = jest.fn();
  const onNewLangHandler = jest.fn();
  const mockDispatch = jest.fn();
  const onActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const tableHeaders = {
    displayName: "Header Name",
                  key: "headerKey",
                  datatype: "string",
  };
  const Data = {
    headerKey: "value"
  };
  const onSaveHandler = jest.fn();
  const inputChangeHandler = jest.fn();
  const checkboxHandler = jest.fn();
  const setSelectedFlagIcon = jest.fn();
  const onEditHandler = jest.fn();
  const onDeleteHandler = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const language = render(
        <Provider store={store}>
            <Language />
            <RdsInput placeholder="Search"  onChange={handleSearchChange}/>
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"new-language"} canvasTitle={"New Language"} />
            <RdsButton label="New Language" onClick={onNewLangHandler}/>
            <RdsCompNewLanguage cultureList={[]} flagIconList={[]} onSaveHandler={onSaveHandler} isEnabled={false} />
            <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[Data]} pagination={true}  onActionSelection={onActionSelection} onPaginationHandler={paginationHandler}/>
            <RdsAlert alertmessage={""} colorVariant={""} />
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"language-edit-off"} canvasTitle={"Edit Language"} />
            <RdsInput label="LanguageManagement.DisplayName" placeholder="Enter Display Name" onChange={inputChangeHandler}/>
            <RdsCheckbox label={"Is Enabled"} checked={undefined}  onChange={checkboxHandler}/>
            <RdsSelectList
              selectItems={[{ option: "Option 1", value: "Value 1" }, { option: "Option 2", value: "Value 2" }]}
              id={"nt.Flag"}
              placeholder="Select Flag Icon"
              onChange={(item: any) => setSelectedFlagIcon(item.value)}
            />
            <RdsButton label="AbpUi.Save"  onClick={() => onEditHandler()}/>
            <RdsCompAlertPopup alertID={"language-delete-off"} onSuccess={onDeleteHandler}/>
        </Provider>
    );
    expect(language).toMatchSnapshot();
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