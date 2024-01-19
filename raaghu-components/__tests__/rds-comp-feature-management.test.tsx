import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFeatureManagement, { RdsCompFeatureManagementProps } from "../src/rds-comp-feature-management/rds-comp-feature-management";
jest.mock("chart.js", () => ({
    ...(jest.requireActual("chart.js") as object),
    ...{
      Line: jest.fn(),
    },
  }));
   
  jest.mock("../../raaghu-elements/src/rds-chart-line/rds-chart-line.tsx", () => {
    return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
  });
   
  jest.mock(
    "../../raaghu-elements/src/rds-chart-doughnut/rds-chart-doughnut.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
    "../../raaghu-elements/src/rds-chart-boolean/rds-chart-boolean.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
      "../../raaghu-elements/src/rds-chart-bar/rds-chart-bar.tsx",
      () => {
        return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
      }
    );
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
const mockFeatureIdentitySettingsData = [
    { value: true },
    { value: "10" },
    { value: false },
    { value: false },
    { value: true },
    { value: true },
    { value: true },
];

const mockTwoFactorList = [
    { label: "Optional", value: "optional" },
    { label: "Disabled", value: "disabled" },
    { label: "Forced", value: "forced" },
];

const mockSaveFeature = jest.fn();
const mockRestoreFeatures = jest.fn();

const mockProps: RdsCompFeatureManagementProps = {
    featureManagementData: mockFeatureIdentitySettingsData,
    onSubmit: mockSaveFeature,
};

describe("RdsCompFeatureManagement", () => {
    test("renders the component with initial values", () => {
        render(<RdsCompFeatureManagement {...mockProps} />);

        // Assert that the navtabs are rendered
        expect(screen.getByText("Identity")).toBeInTheDocument();
        expect(screen.getByText("Language Management")).toBeInTheDocument();
        expect(screen.getByText("Text Template Management")).toBeInTheDocument();
        expect(screen.getByText("Audit Logging")).toBeInTheDocument();
        expect(screen.getByText("Restore to default")).toBeInTheDocument();
        expect(screen.getByText("CANCEL")).toBeInTheDocument();
        expect(screen.getByText("SAVE")).toBeInTheDocument();
    });

    test("calls the saveFeature function when clicking the SAVE button", () => {
        render(<RdsCompFeatureManagement {...mockProps} />);
        fireEvent.click(screen.getByText("SAVE"));
        expect(mockSaveFeature).toHaveBeenCalledTimes(1);
        expect(mockSaveFeature).toHaveBeenCalledWith([]);
    });

    test("calls the restoreFeatures function when clicking the Restore to default button", () => {
        render(<RdsCompFeatureManagement {...mockProps} />);
        fireEvent.click(screen.getByText("Restore to default"));
        expect(mockRestoreFeatures).toHaveBeenCalledTimes(1);
    });
});
