import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../libs/state-management";
import Dashboard from "./Dashboard/Dashboard";
import TenantDashboard from "./tenantDashboard/tenantDashboard";
import AdminDashboard from "./adminDashboard/adminDashboard";
import { RdsBigNumber, RdsBooleanChart, RdsDoughnutChart, RdsLineChart, RdsMap, RdsProgressBar, RdsRadarChart, RdsTable, RdsWidget } from "../../../../raaghu-elements/src";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

global.location = {
    pathname: "../../../libs/proxy/core",
  } as any;
  
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }));
  jest.mock("../../../../raaghu-components/src/index.ts", () => ({
    ...jest.requireActual("../../../../../raaghu-components/src/index.ts"),
  }));
  jest.mock("../../../../raaghu-elements/src/index.ts", () => ({
    ...jest.requireActual("../../../../../raaghu-elements/src/index.ts"),
  }));
  jest.mock("../../../libs/state-management/index.ts", () => ({
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
  jest.mock("../../../../raaghu-elements/src", () => ({
    RdsButton: jest.fn(),
    RdsOffcanvas: jest.fn(),
    RdsAlert: jest.fn(),
    RdsSearch: jest.fn(),
    RdsModal: jest.fn(),
    RdsChartLine: jest.fn(),
    RdsChartDoughnut: jest.fn(),
    RdsChartBoolean: jest.fn(),
    RdsChartBar: jest.fn(),
    RdsWidget: jest.fn(),
    RdsLineChart: jest.fn(),
    RdsMap: jest.fn(),
    RdsBigNumber: jest.fn(),
    RdsDoughnutChart: jest.fn(),
    RdsBooleanChart: jest.fn(),
    RdsTable: jest.fn(),
    RdsProgressBar: jest.fn(),
    RdsRadarChart: jest.fn(),
  }));
  
  jest.mock("../../../../raaghu-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn()
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

  jest.mock("chart.js", () => ({
    ...(jest.requireActual("chart.js") as object),
    ...{
      Line: jest.fn(),
    },
  }));
   
  jest.mock("../../../../raaghu-elements/src/rds-chart-line/rds-chart-line.tsx", () => {
    return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
  });
   
  jest.mock(
    "../../../../raaghu-elements/src/rds-chart-doughnut/rds-chart-doughnut.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
    "../../../../raaghu-elements/src/rds-chart-boolean/rds-chart-boolean.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
      "../../../../raaghu-elements/src/rds-chart-bar/rds-chart-bar.tsx",
      () => {
        return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
      }
    );
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));


  describe("Dashboard", () => {
it("renders Dashboard correctly", async() => {
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
            <Dashboard />
        </Provider>
    );
    await Promise.resolve();
});

it("Check Tenant-dashbord page fucntionality", async() => {
 const handleButtonClick =jest.fn();
 const mockDispatch = jest.fn();
 (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
   payload: {
     totalCount: 10,
   },
 }));

 (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
const tenantDash = render(
     <Provider store={store}>
         <Dashboard />
         <TenantDashboard />
         <RdsLineChart  labels={["12am", "4am", "8am", "12pm", "4pm", "8pm"]} options={undefined} dataSets={[]} id={"linechart"} />
        <RdsWidget headerTitle={"License"}  handleButtonClick={handleButtonClick}/>
        <RdsBigNumber bigNumber="10"></RdsBigNumber>
        <RdsRadarChart   labels={["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]}options={undefined} dataSets={[]} id={"newRadar"} />
        <RdsWidget headerTitle={"Profit Share"} />
        <RdsBigNumber bigNumber="$39,330"></RdsBigNumber>
        <RdsDoughnutChart  labels={['Total Sales - 85%', 'Revenue - 25%', 'Expenses - 15%']} options={undefined} dataSets={[]} id={"doughnutchart"} />
        <RdsBooleanChart labels={["Total Clients Called" ]} options={undefined} dataSets={[]} id={"Boolean1"} />
        <RdsTable headerDatas={[]} tableDatas={[]} />
         <RdsProgressBar colorVariant={"primary"} progressWidth={40} role={"single"} />

     </Provider>
 );
 expect(tenantDash).toMatchSnapshot();
 await Promise.resolve();
});

it("Check Admin-dashbord page fucntionality", async() => {
  const handleButtonClick = jest.fn();
  const onBackSide = jest.fn();
  const mockDispatch = jest.fn();
  (mockDispatch as jest.Mock).mockReturnValue(Promise.resolve({
    payload: {
      totalCount: 10,
    },
  }));
 
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
 const adminDash =  render(
      <Provider store={store}>
          <Dashboard />
          <AdminDashboard user={"abc"} />
          <RdsWidget headerTitle={"Daily Summary"}  handleButtonClick={handleButtonClick}/>
          <RdsLineChart labels={["12am", "4am", "8am", "12pm", "4pm", "8pm"]} options={undefined} dataSets={[]} id={"linechart"} />
          <RdsWidget headerTitle={"Sales"} onIconClick={onBackSide}/>
          <RdsMap mapList={undefined} color={"purple"} />
      </Provider>
  );
  expect(adminDash).toMatchSnapshot();
  await Promise.resolve();
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