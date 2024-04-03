import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store, useAppDispatch } from "../../../../libs/state-management";
import Edition from "./edition";
import { RdsAlert, RdsButton, RdsInput, RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable, RdsCompFeatures } from "../../../rds-components";

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
    RdsInput: jest.fn(),

  }));
  
  jest.mock("../../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsCompFeatures: jest.fn(),
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
  describe("Edition Page", () => {
it("renders Edition page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Edition />
        </Provider>
    );
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[label="Saas.NewEdition"]');
    document.querySelector('[placeholder="Enter Edition Name"]');
    document.querySelector('[button="AbpUi.Cancel"]');

});

it("Check the all events of the page", () => {
  //mock all functions and check the events
  const handleSearchChange = jest.fn();
  const setValue = jest.fn();
  const setInputReset = jest.fn();
  const inputReset :boolean = false;
  const addDataHandler = jest.fn();
  const onActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const deleteHandler = jest.fn();
  const setVal = jest.fn();
  const editDataHandler = jest.fn();
  const handleFeatureCancel = jest.fn();
  const onFeatureSelection = jest.fn();
  const featureDataHandler = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const edition = render(
      <Provider store={store}>
          <Edition />
          <RdsSearch placeholder={"Search"} size={"small"}  onChange={handleSearchChange}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"Edition"} canvasTitle={"Saas.NewEdition"} />
          <RdsButton  onClick={() => {setValue("");setInputReset(!inputReset);}} label="Saas.NewEdition"/>
          <RdsInput placeholder="Enter Edition Name" label="Saas.EditionName"  onChange={(e) => {setValue(e.target.value);setInputReset(!inputReset);}}/>
          <RdsButton label="AbpUi.Cancel" databsdismiss="offcanvas"/>
          <RdsButton label="AbpUi.Save"  onClick={addDataHandler}/>
          <RdsCompDatatable tableHeaders={[{displayName: "Header Display Name", key: "headerKey",datatype: "string"}]} pagination={false} tableData={[]}
            onActionSelection={onActionSelection}
            onPaginationHandler={paginationHandler}
          />
          <RdsAlert alertmessage={""} colorVariant={""} />
          <RdsCompAlertPopup alertID={"edition-delete-offc"} onSuccess={deleteHandler}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"edition-edit-off"} canvasTitle={"Edit Edition"} />
          <RdsInput placeholder="Saas.EditionName" label="Saas.EditionName" onChange={(e) => {setVal(e.target.value); }}/>
          <RdsButton label="AbpUi.Save"  onClick={editDataHandler}/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"feature-off"} canvasTitle={"Features"}  onClose={handleFeatureCancel}/>
          <RdsCompFeatures featuresData={[]} onFeatureSelection={onFeatureSelection} />
          <RdsButton  onClick={featureDataHandler} label="AbpUi.Save"/>
       </Provider>
  );
  expect(edition).toMatchSnapshot();
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