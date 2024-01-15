import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import RdsCompTenantDashboard from "../src/rds-comp-tenant-dashboard/rds-comp-tenant-dashboard";
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = ResizeObserverMock;
  
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
  
describe("RdsCompTenantDashboard", () => {
    it("Renders correctly", () => {
        render(<RdsCompTenantDashboard></RdsCompTenantDashboard>);
        expect(screen.getByText("Monthly Summary")).toBeInTheDocument();
        const salesElement = screen.getAllByText("Sales");
        salesElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("Profit Share")).toBeInTheDocument();
        expect(screen.getByText("Revenue")).toBeInTheDocument();
        expect(screen.getByText("Daily Sales Growth")).toBeInTheDocument();
        expect(screen.getByText("Member Activity")).toBeInTheDocument();
        expect(screen.getByText("Total Calls Connected")).toBeInTheDocument();
        expect(screen.getByText("80%")).toBeInTheDocument();
        expect(screen.getByText("20%")).toBeInTheDocument();
        expect(screen.getByText("Member Activity")).toBeInTheDocument();
    });

    it("render charts correctly", () => {
        render(<RdsCompTenantDashboard />);
        expect(screen.getByTestId("linechart")).toBeInTheDocument();
        expect(screen.getByTestId("doughnutchart")).toBeInTheDocument();
        expect(screen.getByTestId("Boolean1")).toBeInTheDocument();
        expect(screen.getByTestId("barchart")).toBeInTheDocument();
    });

    it("renders table correctly",()=>{
        render(<RdsCompTenantDashboard />);
        const tableElement = screen.getAllByRole("table");
        tableElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("Member")).toBeInTheDocument();
        expect(screen.getByText("Cases")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Closed")).toBeInTheDocument();
        expect(screen.getByText("Rate")).toBeInTheDocument();
        expect(screen.getByText("92%")).toBeInTheDocument();
        expect(screen.getByText("Kim")).toBeInTheDocument();
        expect(screen.getByText("Senior Developer")).toBeInTheDocument();
        expect(screen.getByText("Jane")).toBeInTheDocument();
        expect(screen.getByText("Sales Executive")).toBeInTheDocument();
        const softwareDeveloperOccurence =
      screen.getAllByText("Software Developer");
        softwareDeveloperOccurence.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const brianOccurence = screen.getAllByText("Brian");
        brianOccurence.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const kathOccurence = screen.getAllByText("Kath");
        kathOccurence.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const managerOccurence = screen.getAllByText("Manager");
        managerOccurence.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const iconElement = screen.getAllByRole("img");
        iconElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });
});
