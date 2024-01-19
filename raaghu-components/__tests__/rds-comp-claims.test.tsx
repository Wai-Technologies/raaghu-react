import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompClaims, { RdsCompClaimsProps } from "../src/rds-comp-claims/rds-comp-claims";
// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    const React = jest.requireActual('react');
    return {
      ...jest.requireActual('react-lottie-player'),
      useRef: React.useRef,
    };
  });
  
// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    return {
      ...jest.requireActual('react-lottie-player'),
      __esModule: true,
      default: jest.fn(),
    };
  });
  
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: any) => key }),
}));

const tableHeaders = [
    {
        displayName: "Edition Name",
        key: "editionName",
        datatype: "text",
        dataLength: 30,
        required: true,
        sortable: true,
    },
    {
        displayName: "Price ($)",
        key: "price",
        datatype: "number",
        dataLength: 5,
        required: false,
        sortable: true,
    },
    {
        displayName: "Trial Period(Day(s))",
        key: "trialPeriod",
        datatype: "number",
        dataLength: 5,
        required: true,
    },
];
const tableData = [
    { id: 1, editionName: "Standard", price: 60, trialPeriod: 1 },
    { id: 2, editionName: "Basic", price: 120, trialPeriod: 23 },
    { id: 3, editionName: "Premium", price: 250, trialPeriod: 3 },
    { id: 4, editionName: "Standard", price: 60, trialPeriod: 4 },
    { id: 5, editionName: "Basic", price: 100, trialPeriod: 5 },
    { id: 6, editionName: "Standard", price: 60, trialPeriod: 6 },
    { id: 7, editionName: "Premium", price: 100, trialPeriod: 7 },
    { id: 8, editionName: "Standard", price: 100, trialPeriod: 8 },
    { id: 9, editionName: "Standard", price: 100, trialPeriod: 9 },
];
const actions = [
    { id: "delete", displayName: "Delete" },
    { id: "edit", displayName: "Edit" },
];

describe("RdsCompClaims", () => {
    const mockProps: RdsCompClaimsProps = {
        allClaimsArray: [],
        claimsTable: [],
        id: 1,
    };

    it("renders the component correctly", () => {
        render(<RdsCompClaims {...mockProps} />);

        // Assert that the required elements are present on the screen
        expect(screen.getByText("AbpIdentity.ClaimTypes")).toBeInTheDocument();
        expect(screen.getByText("AbpIdentity.ClaimValue")).toBeInTheDocument();
        // const selectText = screen.getAllByText("button");
        // selectText.forEach((item)=>{
        //     expect(item).toBeInTheDocument();
        // });
        // expect(screen.getByText("Add")).toBeInTheDocument();
    });
});
