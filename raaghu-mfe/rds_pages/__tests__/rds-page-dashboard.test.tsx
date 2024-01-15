import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Dashboard from "../rds-page-dashboard/src/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "../../libs/state-management/index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));
jest.mock("chart.js", () => ({
    ...(jest.requireActual("chart.js") as object),
    ...{
      Line: jest.fn(),
    },
  }));
   
  jest.mock("../../../raaghu-elements/src/rds-chart-line/rds-chart-line.tsx", () => {
    return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
  });
   
  jest.mock(
    "../../../raaghu-elements/src/rds-chart-doughnut/rds-chart-doughnut.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
    "../../../raaghu-elements/src/rds-chart-boolean/rds-chart-boolean.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
      "../../../raaghu-elements/src/rds-chart-bar/rds-chart-bar.tsx",
      () => {
        return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
      }
    );
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));

describe("RdsPageDashboard", () => {
    it("renders correctly", () => {
        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );
    });
});
