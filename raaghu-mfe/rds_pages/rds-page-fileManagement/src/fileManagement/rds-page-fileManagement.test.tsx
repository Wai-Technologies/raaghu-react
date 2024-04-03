import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import FileManagement from "./fileManagement";
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next'; // Import your i18n configuration
import { RdsCompFileManagementTree } from "../../../rds-components";
import { RdsButtonGroup, RdsLabel } from "../../../../../raaghu-elements/src";

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: any) => key }),
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
    RdsButtonGroup : jest.fn(),
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
    RdsCompFileManagementTree: jest.fn(),
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
  describe("Filemanagement Page", () => {
    it("renders Filemanagement page correctly", () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RdsCompFileManagementTree items={[]} />
          </I18nextProvider>
        </Provider>
      );
  
      document.querySelector('[label="Download All"]');
      document.querySelector('[button="Clear All"]');
    });

    it("Check Filemanagement page Functionality", () => {
      const handleClick = jest.fn();
      const handlerButtonGroupClick = jest.fn();
      const props = {
        onDragAndDrop: jest.fn(),
      };
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      
     const file = render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RdsCompFileManagementTree items={[]}  onDragAndDrop={props.onDragAndDrop}/>
            <RdsLabel onClick={handleClick}/>
            <RdsButtonGroup vertical={false} isOutline={false} size={""} role={"button"} buttonGroupItems={[]}  onButtonClick={handlerButtonGroupClick}/>
          </I18nextProvider>
        </Provider>
      );
      expect(file).toMatchSnapshot();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
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