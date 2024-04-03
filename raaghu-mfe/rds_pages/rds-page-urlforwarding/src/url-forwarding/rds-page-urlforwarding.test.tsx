import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import UrlForwarding from "./url-forwarding";
import { RdsButton, RdsOffcanvas } from "../../../../../raaghu-elements/src";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompUrlForwardings } from "../../../rds-components";

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
    RdsCompUrlForwardings : jest.fn(),
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
  describe("Url forwarding Page", () => {
it("renders Url forwarding page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <UrlForwarding />
        </Provider>
    );
        document.querySelector('[button="URL"]');
        document.querySelector('[title="NEW URL"]');
        document.querySelector('[button="AbpUi.Cancel"]');
        document.querySelector('[button="AbpUi.Save"]');

});

it("Check the URL forwarding page", () => {
  const tableHeader = { displayName: "URL", key: "url", datatype: "string" };
  const urlForwardingData = { url: "test" };
  const handlerActions = jest.fn();
  const paginationHandler = jest.fn();
  const handlerCloseOffcanvas = jest.fn();
  const newUrlForwardingData = { url: "test" };
  const getUrlForwardingsData = jest.fn();
  const handlerSaveUrl = jest.fn();
  const getUrlForwardingsDataForEdit = jest.fn();
  const handlerEditUrlForwardings = jest.fn();
  const handlerDeleteConfirm = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const url = render(
      <Provider store={store}>
          <UrlForwarding />
          <RdsButton label="URL" iconColorVariant="light"/>
            <RdsCompDatatable tableHeaders={[tableHeader]} tableData={[urlForwardingData]} pagination={true} onActionSelection={handlerActions} onPaginationHandler={paginationHandler}/>
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"newUrlForwarding"} canvasTitle={"NEW URL"} onClose={handlerCloseOffcanvas}/>
            <RdsCompUrlForwardings urlForwardingData={newUrlForwardingData} emitUrlForwardingData={getUrlForwardingsData}/>
            <RdsButton label="AbpUi.Cancel" onClick={handlerCloseOffcanvas}/>
            <RdsButton label="AbpUi.Save" onClick={handlerSaveUrl}/>
            <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"editUrlForwardingoff"} canvasTitle={"Edit Url"} />
            <RdsCompUrlForwardings emitUrlForwardingData={getUrlForwardingsDataForEdit}/>
            <RdsButton label="AbpUi.Save" onClick={handlerEditUrlForwardings}/>
            <RdsCompAlertPopup alertID={"deleteUrlForwardingoff"} onSuccess={handlerDeleteConfirm}/>
      </Provider>
  );
  expect(url).toMatchSnapshot();
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