import React from "react";
import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import MyAccount from "./my-account";
import { RdsAlert, RdsButton, RdsCheckbox, RdsNavtabs } from "../../../rds-elements";
import { RdsCompChangePassword, RdsCompPersonalInfo, RdsCompProfilePicture } from "../../../rds-components";

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
    RdsNavtabs: jest.fn(),
    RdsCheckbox : jest.fn(),
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompProfilePicture:jest.fn(),
    RdsCompPersonalInfo:jest.fn(),
    RdsCompChangePassword:jest.fn(),
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
describe("My Acoount page", () => {
it("renders My Accunt page correctly",()=>{
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
        <MyAccount/> 
    </Provider>);
 document.querySelector('[label="AbpAccount.DisplayName:TwoFactorEnabled"]');
 document.querySelector('[button="AbpUi.Save"]');

});

it("check account page behaviour",()=>{
  const  navtabsItems={
      label: "Tab Label",
      id: "tab1",
  };
  const activeNavTabId = "tab1";
  const setActiveNavTabId = jest.fn();
  const submitProfilePic = jest.fn();
  const postProfilePic = jest.fn();
  const changePasswordData = jest.fn();
  const handlePasswordDataSubmit = jest.fn();
  const handlePersonalInfoSubmit = jest.fn();
  const handleVerifyEmailDataSubmit = jest.fn();
  const twoFactorData = jest.fn();
  const handleTwoFactorSubmit = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  const account = render(<Provider store={store}>
      <MyAccount/> 
      <RdsNavtabs navtabsItems={[navtabsItems]} activeNavTabId={activeNavTabId} type={"tabs"} activeNavtabOrder={(activeNavTabId) => {setActiveNavTabId(activeNavTabId);
                                    }}/>
      <RdsAlert alertmessage={""} colorVariant={""} />
      <RdsCompProfilePicture  handleProfileDataSubmit={submitProfilePic}  postProfilePic={postProfilePic} />
      <RdsCompChangePassword changePasswordData={changePasswordData} handlePasswordDataSubmit={ handlePasswordDataSubmit} />
      <RdsCompPersonalInfo handlePersonalDataSubmit={handlePersonalInfoSubmit} handleVerifyEmailSubmit={handleVerifyEmailDataSubmit}/>
      <RdsCheckbox label={"AbpAccount.DisplayName:TwoFactorEnabled"} checked={twoFactorData} onChange={(e: any) => { handleTwoFactorSubmit(e.target.checked); }}/>
      <RdsButton label="AbpUi.Save" onClick={() => { handleTwoFactorSubmit(twoFactorData); }}/>
  </Provider>);
  expect(account).toMatchSnapshot();
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
