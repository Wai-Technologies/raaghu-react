import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Tenant from "./tenant";
import { RdsButton, RdsDropdownList, RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatabaseConnection, RdsCompDatatable, RdsCompFeatures, RdsCompSetPassword, RdsCompTenantInformation } from "../../../rds-components";

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
  describe("Tenant Page", () => {
it("renders Tenant page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Tenant />
        </Provider>
    );
        document.querySelector('[placeholder="Search"]');
        document.querySelector('[placeholder="Status Code"]');
        document.querySelector('[placeholder="Select Status"]');
        document.querySelector('[button="Saas.NewTenant"]');
});

it("Check tenant page fuctions", () => {
  const setFilter = jest.fn();
  const editionList = {
      id: 1,
      name: "Enterprise",
  };
  const onHttpCodeFilter = jest.fn();
  const activationStateList = {
      label: "Active",
      val: "Active",
  };
  const onActivationStateFilter = jest.fn();
  const createNewCanvasFn = jest.fn();
  const newTenantInforData = {
      id: 1,
      name: "Test",
      edition: "Enterprise",
      activationState: "Active",
  };
  const handleCreateNewTenant = jest.fn();
  const tableHeaders = { displayName: "Tenant", key: "name", datatype: "string" };
  const tableData = {
      name: "Test",
      edition: "Enterprise",
      activationState: "Active",
  };
  const handleActionSelection = jest.fn();
  const paginationHandler = jest.fn();
  const editTenantInfoData = {
      id: 1,
      name: "Test",
      edition: "Enterprise",
      activationState: "Active",
  };
  const handlerUpdateTenat = jest.fn();
  const connectionStrings = {
      id: 1,
      connectionString: "Test",
  };
  const handleDatabaseConnection = jest.fn();
  const handleFeatureCancel = jest.fn();
  const featuresData = {
      id: 1,
      name: "Test",
      description: "Test",
  };
  const setEmittedFeaturesData = jest.fn();
  const setFeaturesData = jest.fn();
  const handlerFeatureUpadate = jest.fn();
  const handlerSetPassword = jest.fn();
  const handleDeleteRecord = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const tenant = render(
      <Provider store={store}>
          <Tenant />
          <RdsSearch placeholder={"Search"} size={"small"} onChange={(e: any) =>{setFilter({filter: e.target.value})}}/>
          <RdsDropdownList listItems={[{ label: editionList.name, val: editionList.id.toString() }]} placeholder="Status Code" isPlaceholder={true} onClick={(event, selectedCode) =>onHttpCodeFilter(selectedCode)
                            }/>
          <RdsDropdownList listItems={[activationStateList]} placeholder="Select Status" isIconPlaceholder={false} onClick={(event, selectedStatus) =>onActivationStateFilter(selectedStatus)
                            }/>
          <RdsOffcanvas placement={"end"} backDrop={false} scrolling={false} offId={"tenant-new-off"} canvasTitle={"Saas.NewTenant"} />
          <RdsButton label="Saas.NewTenant" onClick={(e: any) => createNewCanvasFn(e)} iconColorVariant="light" showLoadingSpinner={true}/>
          <RdsCompTenantInformation tenantInfoData={newTenantInforData} editions={editionList} onSaveHandler={handleCreateNewTenant}/>
          <RdsCompDatatable tableHeaders={[tableHeaders]} tableData={[tableData]} pagination={true} onActionSelection={handleActionSelection} onPaginationHandler={paginationHandler}/>
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"tenant-edit-off"} canvasTitle={"Edit Tenant"} />
          <RdsCompTenantInformation tenantInfoData={editTenantInfoData} editions={editionList} onSaveHandler={handlerUpdateTenat}/>
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"tenant-connection-off"} canvasTitle={"Database Connection String"} />
          <RdsCompDatabaseConnection connectionStrings={connectionStrings} isModuleSpecificDb={false}  onSaveHandler={handleDatabaseConnection}/>
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"tenant-feaures-off"} canvasTitle={"Feature"} onClose={handleFeatureCancel}/>
          <RdsCompFeatures featuresData={[featuresData]} onFeatureSelection={(data: any) =>setEmittedFeaturesData(data)} emittedDataFeatureData={(data: any) => {setFeaturesData(data);}}/>
          <RdsButton label="AbpUi.Cancel" onClick={handleFeatureCancel} databsdismiss="offcanvas"/>
          <RdsButton label="AbpUi.Save" onClick={handlerFeatureUpadate} databsdismiss="offcanvas"/>
          <RdsOffcanvas placement={"end"} backDrop={true} scrolling={false} offId={"tenant-password-off"} canvasTitle={"Set Password"} />
          <RdsCompSetPassword  onSaveHandler={handlerSetPassword}/>
          <RdsCompAlertPopup alertID={"tenant-delete-off"} onSuccess={handleDeleteRecord}/>
      </Provider>
  );
  expect(tenant).toMatchSnapshot();
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