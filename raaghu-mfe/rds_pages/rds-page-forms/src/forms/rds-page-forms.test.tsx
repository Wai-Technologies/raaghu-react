import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Forms from "./forms";
import { RdsAlert, RdsButton, RdsIcon, RdsLabel, RdsNavtabs, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompFormsEmail } from "../../../rds-components";

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
    RdsNavtabs : jest.fn(),
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompForgotPassword: jest.fn(),
    RdsCompFormsEmail: jest.fn(),
    
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
  describe("Forms Page", () => {
it("renders Forms page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Forms />
        </Provider>
    );
    document.querySelector('[button="New Form"]');
    document.querySelector('[title="Forms.Form:SendFormHeader"]');
    document.querySelector('[label="Forms.Link"]');
});

it("Check Forms page with all the components and elements", () => {
  const addFormHandler = jest.fn();
  const paginationHandler = jest.fn();
  const scopeSelection = jest.fn();
  const onDeleteHandler = jest.fn();
  const offCanvasHandler = jest.fn();
  const navtabsSendItems = {
    label: "Forms.Send",
    key: "send",
    icon: "send",
    onClick: scopeSelection,
  };
  const tableHeaders={
      displayName: "Header Name",
      key: "headerKey",
      datatype: "string",
      };
      const formsData = {};
      const setActiveNavTabSendId = jest.fn();
      const setShowNextSendTab = jest.fn();
      const handleEmailSubmit = jest.fn();
      const handleCopyLink = jest.fn();
 const mockDispatch = jest.fn();
 (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const form = render(
      <Provider store={store}>
          <Forms />
          <RdsButton size="small" label="New Form" onClick={addFormHandler}/>
          <RdsCompDatatable
            tableHeaders={[tableHeaders]}  
            tableData={[formsData]}
            pagination={false}
            onPaginationHandler={paginationHandler}
            onActionSelection={scopeSelection}
          />
          <RdsAlert alertmessage={""} colorVariant={""} />
          <RdsCompAlertPopup alertID={"form-delete-off"} onSuccess={onDeleteHandler}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"forms-send-offc"} canvasTitle={"Forms.Form:SendFormHeader"} onclick={offCanvasHandler}/>
          <RdsNavtabs navtabsItems={[{ ...navtabsSendItems, id: "some-id" }]} type={"tabs"} activeNavtabOrder={(activeNavTabSendId) => {setActiveNavTabSendId(activeNavTabSendId),setShowNextSendTab(false);
                }}/>
          <RdsCompFormsEmail handleSubmit={(data: any) => {handleEmailSubmit(data); }}/>
          <RdsLabel label="Forms.Link"/>
          <RdsIcon  onClick={(event: any) => { handleCopyLink() }}/>
      </Provider>
  );
  expect(form).toMatchSnapshot();
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