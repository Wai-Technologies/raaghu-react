import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import PaymentRequests from "./paymentRequests";
import { RdsDatePicker, RdsInput, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompDatatable } from "../../../rds-components";

// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
  filter: jest.fn(),
  forEach: jest.fn(),
}));

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
  RdsCheckbox: jest.fn(),
  RdsIcon: jest.fn(),
  RdsInput: jest.fn(),
  RdsDatePicker: jest.fn(),
}));

jest.mock("../../../../../raaghu-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompProfilePicture: jest.fn(),
  RdsCompPersonalInfo: jest.fn(),
  RdsCompChangePassword: jest.fn(),
  RdsCompOrganizationTree: jest.fn(),
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
describe("Organization page", () => {
  it("renders organization page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <PaymentRequests />
      </Provider>
    );
    document.querySelector('[placeholder="Payment.Search"]');
  });

it("Check Payment Requests page", () => {
  const onPaymentDatePicker = jest.fn();
  const onPaymentFilter = jest.fn();
  const tableHeaders = { displayName: "Payment.Requests", key: "paymentRequests", datatype: "string" };
  const setTableDataProducts = jest.fn();
  const paginationHandler = jest.fn();
  const tableHeadersProducts = { displayName: "Payment.Requests", key: "paymentRequests", datatype: "string" };
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const request =  render(
    <Provider store={store}>
      <PaymentRequests />
      <RdsDatePicker isDropdownOpen={false} customDate={onPaymentDatePicker}/>
      <RdsInput placeholder="Payment.Search"  onChange={onPaymentFilter}/>
      <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[]} pagination={false} onActionSelection={(event) => setTableDataProducts(event)}  onPaginationHandler={paginationHandler}/>
      <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"paymentRequests"} canvasTitle={""} />
      <RdsCompDatatable tableHeaders={[tableHeadersProducts]} tableData={[]} pagination={false} />
    </Provider>
  );
  expect(request).toBeTruthy();
  expect(request).toMatchSnapshot();
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
