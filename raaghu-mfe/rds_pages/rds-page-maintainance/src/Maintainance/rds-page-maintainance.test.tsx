import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Maintainance from "./Maintainance";
import { RdsButton, RdsFabMenu, RdsNavtabs } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompCache, RdsCompWebsiteLog } from "../../../rds-components";

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
            <Maintainance />
        </Provider>
    );
    document.querySelector('[label="Download All"]');
    document.querySelector('[button="Clear All"]');
});

it("Check maintainance page functions", () => {
  const DeleteAllCacheData = jest.fn();
  const listItems1 = {
    label: "Clear All",
    icon: "delete",
    onClick: DeleteAllCacheData,
  };
  const refreshData = jest.fn();
  const downloadcsv = jest.fn();
  const listItems2 = {
    label: "Download All",
    icon: "download",
    onClick: downloadcsv,
  };
  const navtabsItems = {
    label: "Refresh",
    icon: "refresh",
    onClick: refreshData,
  };
  const onchangetabs = jest.fn();
  const Delete = jest.fn();
  const cache = {
    id: "some-id",
    name: "some-name",
    type: "some-type",
    status: "some-status",
    lastUpdated: "some-lastUpdated",
    size: "some-size",
    action: "some-action",
  };
  const websiteLogData = {};
  const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const maintainance = render(
        <Provider store={store}>
            <Maintainance />
            <RdsButton label="Clear All" />
            <RdsCompAlertPopup alertID={"maintainance"}  onSuccess={DeleteAllCacheData}/>
            <RdsFabMenu listItems={[listItems1]} />
            <RdsButton  onClick={refreshData}/>
            <RdsButton label="Download All"  onClick={downloadcsv}/>
            <RdsFabMenu listItems={[listItems2]} />
            <RdsNavtabs navtabsItems={[{ ...navtabsItems, id: "some-id" }]} type={"tabs"}  activeNavtabOrder={onchangetabs}/>
            <RdsCompCache cachedata={[cache]} recordsperpage={0}  onclick={Delete}/>
            <RdsCompWebsiteLog websiteLogData={[websiteLogData]} pagination={false} alignmentType={undefined} totalRecords={0} recordsPerPage={0} />
        </Provider>
    );
    expect(maintainance).toMatchSnapshot();
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