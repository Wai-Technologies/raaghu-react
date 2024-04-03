import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import ClaimType from "./Claim-Type";
import { RdsAlert, RdsButton, RdsOffcanvas } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompNewClaimType } from "../../../rds-components";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
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
    
  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsCompNewClaimType: jest.fn(),
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
  
  jest.mock('../../../../libs/state-management/Blogs/blogs-slice.ts', () => ({ 
    fetchBlogsData: jest.fn().mockResolvedValue({
      payload: {
        totalCount: 10, 
      },
    }),
  }));
  

  global.localStorage = localStorageMock;
  describe("Claimtype", () => {
it("renders Claimtype correctly", async() => {
        // Mock the useDispatch hook
    const mockDispatch = jest.fn();
    (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
      payload: {
        totalCount: 10,
      },
    }));

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <ClaimType />
        </Provider>
    );
    document.querySelector('[button="AbpIdentity.NewClaimType"]');
    await Promise.resolve();
});

it("Check the Claimtype functionality", async() => { 
  const submitHandler = jest.fn();
  const mockDispatch = jest.fn();
  const handleClearValue = jest.fn();
  const onActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const DeleteHandler = jest.fn();
  const onEditHandler = jest.fn();
  const valueType = { option: 'String', value: '0' };
  (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
    payload: {
      totalCount: 10,
    },
  }));
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  const claimType = render(
      <Provider store={store}>
          <ClaimType />
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"claimType-add-off"} canvasTitle={"AbpIdentity.NewClaimType"} ></RdsOffcanvas>
          <RdsButton  onClick={handleClearValue} label="AbpIdentity.NewClaimType"></RdsButton>
          <RdsCompNewClaimType onSubmit={submitHandler} valueType={[{ option: 'String', value: '0' }]}></RdsCompNewClaimType>
          <RdsCompDatatable tableHeaders={[]} tableData={[]} pagination={false} onActionSelection={onActionSelection} onPaginationHandler={paginationHandler}></RdsCompDatatable>
          <RdsAlert alertmessage={""} colorVariant={""}></RdsAlert>
          <RdsCompAlertPopup alertID={"claimType-delete-off"} onSuccess={DeleteHandler}></RdsCompAlertPopup>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"claimType-edit-off"} canvasTitle={"Edit Claim Type"}></RdsOffcanvas>
          <RdsCompNewClaimType onSubmit={onEditHandler} valueType={[valueType]}></RdsCompNewClaimType>
      </Provider>
  );
  expect(claimType).toMatchSnapshot();
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