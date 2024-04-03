import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import PaymentPlans from "./paymentPlans";
import { RdsButton, RdsInput, RdsOffcanvas } from "../../../../../raaghu-elements/src";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
// Mock lodash-es directly in the test file
jest.mock("lodash-es", () => ({
  filter: jest.fn(),
  forEach: jest.fn(),
  // Add any other lodash functions that you are using in your code
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
describe("Payment-plans page", () => {
  it("renders Payment-plans page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <PaymentPlans />
      </Provider>
    );
    document.querySelector('[button="Payment.NewPlan"]');
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[placeholder="Enter Name"]');
  });

it("Check payment Plans page behaviour", () => {
    const onSearchFilter = jest.fn();
    const createpaymentPlansFn = jest.fn();
    const setPaymentPlansObj = jest.fn();
    const handlerCloseOffcanvas = jest.fn();
    const createNewPaymentPlan = jest.fn();
    const setGatewayPlansObj = jest.fn();
    const updateNewGatewayPlan = jest.fn();
    const cancelGatewaySelection = jest.fn();
    const createNewGatewayPlan = jest.fn();
    const onActionSelectionGatewayPlan = jest.fn();
    const saveUpdatePaymentPlans = jest.fn();
    const paginationHandler = jest.fn();
    const tableHeadersGatewayPlans = {
      displayName: "Payment.Name",
      header: "Payment.Name",
      key: "name",
      sortable: true,
      filterable: true,
      width: "200px",
    };
    const tableHeadersPlans = {
      displayName: "Payment.Name",
      header: "Payment.Name",
      key: "name",
      sortable: true,
      filterable: true,
      width: "200px",
      datatype: "string",
    };
    const onActionSelection = jest.fn();
    const confirmDelete = jest.fn();
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const payment = render(
      <Provider store={store}>
        <PaymentPlans />
        <RdsInput placeholder="Search" onChange={onSearchFilter}/>
        <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"payPlan-new-off"} canvasTitle={"New Payment Plans"} />
        <RdsButton label="Payment.NewPlan" onClick={createpaymentPlansFn}/>
        <RdsInput label="Name" placeholder="Enter Name" onChange={setPaymentPlansObj}/>
        <RdsButton label="AbpUi.Cancel"  databsdismiss="offcanvas" onClick={handlerCloseOffcanvas}/>
        <RdsButton label="AbpUi.Save" onClick={(event) => createNewPaymentPlan(event)}/>
        <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={undefined} canvasTitle={"New Payment Plans"} onClose={handlerCloseOffcanvas}/>
        <RdsInput label="Name" placeholder="Enter Name" onChange={setPaymentPlansObj}/>
        <RdsInput label="Gateway" placeholder="Enter Gateway" onChange={setGatewayPlansObj}/>
        <RdsInput label="Payment.DisplayName:ExternalId" placeholder="Enter External Id" onChange={setGatewayPlansObj}/>
        <RdsButton onClick={(event) => updateNewGatewayPlan(event)}/>
        <RdsButton onClick={(event) => cancelGatewaySelection(event)}/>
        <RdsButton onClick={(event) => createNewGatewayPlan(event)}/>
        <RdsCompDatatable tableHeaders={[{ ...tableHeadersGatewayPlans, datatype: "string" }]} tableData={[]} pagination={true} onActionSelection={onActionSelectionGatewayPlan} onPaginationHandler={paginationHandler}/>
        <RdsButton label="AbpUi.Cancel"  onClick={handlerCloseOffcanvas}/>
        <RdsButton label="AbpUi.Save" onClick={(event) => saveUpdatePaymentPlans(event)}/>
        <RdsCompDatatable tableHeaders={[tableHeadersPlans]} tableData={[]} pagination={true} onActionSelection={onActionSelection} onPaginationHandler={paginationHandler}/>
     <RdsCompAlertPopup alertID={"payPlan-delete-off"} onSuccess={confirmDelete}/>
      </Provider>
    );
    expect(payment).toMatchSnapshot();
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
