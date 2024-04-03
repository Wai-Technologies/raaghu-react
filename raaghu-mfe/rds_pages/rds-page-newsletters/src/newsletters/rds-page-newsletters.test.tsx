import React from "react";
import "@testing-library/jest-dom";
import { render} from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import Newsletters from "./Newsletters";
import { RdsSearch } from "../../../rds-elements";
import { RdsCompDatatable } from "../../../rds-components";

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
describe("NewsLetter page", () => {
it("renders News Letter page correctly",()=>{
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
        <Newsletters/> 
    </Provider>);
 document.querySelector('[placeholder="Search"]');

});

it("Check newsletter page data",()=>{
    const tableHeaders = {
        displayName: "CmsKit.Details",
        key: "details",
        datatype: "text",
        sortable: true,
        required: true,
        dataLength: 30,
    };
    const paginationHandler = jest.fn();
    const newsLettersData = [
        {
            details: "details",
            emailaddress: "emailaddress",
            creationtime: "creationtime",
        },
    ];
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const letter = render(<Provider store={store}>
        <Newsletters/> 
        <RdsSearch placeholder={"Search"} size={"small"} />
        <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[newsLettersData]} pagination={false}  onPaginationHandler={paginationHandler}/>

    </Provider>);
    expect(letter).toMatchSnapshot();
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
