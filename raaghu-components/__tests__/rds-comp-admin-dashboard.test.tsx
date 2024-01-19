import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import RdsCompAdminDashboard from "../src/rds-comp-admin-dashboard/rds-comp-admin-dashboard";
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
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompAdminDashboard", () => {
    it("renders correctly", () => {
        render(<RdsCompAdminDashboard user={""} />);
        const salesElement = screen.getAllByText("Sales");
        salesElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const salesDatElement = screen.getAllByText("$632,230");
        salesElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("Profit Share")).toBeInTheDocument();
        expect(screen.getByText("$39,330")).toBeInTheDocument();
        expect(screen.getByText("Revenue")).toBeInTheDocument();
        expect(screen.getByText("Call Overview")).toBeInTheDocument();
        expect(screen.getByText("Daily Sales Growth")).toBeInTheDocument();
        expect(screen.getByText("Member Activity")).toBeInTheDocument();
        expect(screen.getByText("Total Calls Connected")).toBeInTheDocument();
        expect(screen.getByText("Total Clients Called")).toBeInTheDocument();
        expect(screen.getByText("80%")).toBeInTheDocument();
        expect(screen.getByText("20%")).toBeInTheDocument();
        expect(screen.getByText("$373,960")).toBeInTheDocument();
        expect(screen.getByText("$8,425")).toBeInTheDocument();
        expect(screen.getByText("$5850")).toBeInTheDocument();
        expect(screen.getByText("Member Activity")).toBeInTheDocument();
        expect(screen.getByText("Day")).toBeInTheDocument();
        expect(screen.getByText("Week")).toBeInTheDocument();
        expect(screen.getByText("Month")).toBeInTheDocument();
    });


    it("renders table correctly",()=>{
        render(<RdsCompAdminDashboard user={""} />);
        const tableElement = screen.getAllByRole("table");
        tableElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("To do List")).toBeInTheDocument();
        expect(screen.getByText("Members")).toBeInTheDocument();
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
        expect(screen.getByText("To do List")).toBeInTheDocument();
        expect(screen.getByText("Project")).toBeInTheDocument();
        expect(screen.getByText("Issue")).toBeInTheDocument();
        expect(screen.getByText("Progress")).toBeInTheDocument();
        const volosoftText = screen.getAllByText("Volosoft");
        volosoftText.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const activateAccountText = screen.getAllByText(
            "Activate your account with others intil June 2023"
        );
        activateAccountText.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const websiteText = screen.getAllByText("Website");
        websiteText.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const paymentModuleText = screen.getAllByText("Payment Module");
        paymentModuleText.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("ABP Framework")).toBeInTheDocument();
        expect(
            screen.getByText("Your Order @22345678 has been confirmed")
        ).toBeInTheDocument();
        expect(screen.getByText("Modules")).toBeInTheDocument();
        expect(screen.getByText("ASPNET Zero")).toBeInTheDocument();
        const dueInTwoDaysText = screen.getAllByText("Due in two days");
        dueInTwoDaysText.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    it("renders progress bar correctly", ()=>{
        render(<RdsCompAdminDashboard user={""} />);
        const progressElement = screen.getAllByRole("progressbar");
        progressElement.forEach(item=>{
            expect(item).toBeInTheDocument();
        });
    });
});
