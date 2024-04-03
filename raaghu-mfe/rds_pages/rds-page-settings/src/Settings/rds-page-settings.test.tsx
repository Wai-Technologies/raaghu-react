import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Settings from "./Settings";
import { RdsNavtabs } from "../../../../../raaghu-elements/src";
import { RdsCompAccount, RdsCompEmail, RdsCompIdentityManagement } from "../../../rds-components";

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
  describe("Settings Page", () => {
it("renders Settings page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Settings />
        </Provider>
    );
});

it("Check settings page for the presence of the elements and components", () => {
  const navtabsItems ={ label: "Tab Label", id: "tab1" };
    const setActiveNavTabId = jest.fn();
    const emailSettings = {
        email: ""
    };
    const sendTestEmailData = jest.fn();
    const handleEmailSubmit = jest.fn();
    const handleTestEmailRequest = jest.fn();
    const handlerIdentitySubmit = jest.fn();
    const accountGeneralSettings = {
        general: ""
    };
    const accountTwoFactorSettings = {
        twoFactor: ""
    };
    const accountCaptchaSettings = {
        captcha: ""
    };
    const handlerAccountSubmit = jest.fn();
  const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const settings = render(
        <Provider store={store}>
            <Settings />
            <RdsNavtabs navtabsItems={[navtabsItems]} type={"tabs"} activeNavtabOrder={(activeNavTabId) => {setActiveNavTabId(activeNavTabId);
                            }}/>
            <RdsCompEmail emailSettings={emailSettings} sendTestEmailData={sendTestEmailData} onEmailDataSubmit={handleEmailSubmit}  onTestEmailRequest={handleTestEmailRequest}/>
            <RdsCompIdentityManagement onIdentitySettingsSubmit={handlerIdentitySubmit} lockoutSettings={undefined} passwordSettings={undefined} signSettings={undefined} userSettings={undefined} />
            <RdsCompAccount accountGeneralSettings={accountGeneralSettings} accountTwoFactorSettings={accountTwoFactorSettings} accountCaptchaSettings={accountCaptchaSettings}  onSubmit={(data: any) => {handlerAccountSubmit(data);
                                }} />
        </Provider>
    );
    expect("settings").toMatchSnapshot();
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