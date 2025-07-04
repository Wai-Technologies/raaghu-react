import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RdsCompAddressDetail } from "../src";

// Mock RdsCompIcon component
jest.mock('../src/rds-icon', () => ({
    __esModule: true,
    default: () => <div data-testid="mocked-icon">IconMock</div>
}));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("RdsCompAddressDetail component", () => {
    it("this is message", () => {
        render(<RdsCompAddressDetail children={undefined} addressLine2={""} />);
    });

    it("renders without icon", () => {
        render(
            <RdsCompAddressDetail
                withIcon={false}
                header="Address"
                addressLine1="123 Main St"
                addressLine2="Apt 4"
                addressLine3="Anytown, USA"
                children={undefined}
            />
        );
        const addressElement = screen.getByText("Address");
        expect(addressElement).toBeInTheDocument();
        expect(screen.getByText("123 Main St,")).toBeInTheDocument();
        expect(screen.getByText("Apt 4,")).toBeInTheDocument();
        expect(screen.getByText("Anytown, USA")).toBeInTheDocument();
    });    it("renders with icon", () => {
        render(
            <RdsCompAddressDetail
                withIcon={true}
                header="Address"
                addressLine1="123 Main St"
                addressLine2="Apt 4"
                addressLine3="Anytown, USA"
                children={undefined}
            />
        );
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("123 Main St,")).toBeInTheDocument();
        expect(screen.getByText("Apt 4,")).toBeInTheDocument();
        expect(screen.getByText("Anytown, USA")).toBeInTheDocument();
        expect(screen.getByTestId("mocked-icon")).toBeInTheDocument();
    });    it("renders with card border", () => {
        render(
            <RdsCompAddressDetail
                withIcon={true}
                cardborder={true}
                header="Address"
                addressLine1="123 Main St"
                addressLine2="Apt 4"
                addressLine3="Anytown, USA"
                children={undefined}
            />
        );
        const addressDetailElement = screen.getByTestId("address-detail");
        expect(addressDetailElement).toBeInTheDocument();
        expect(addressDetailElement).toHaveClass("card");
        expect(screen.getByTestId("mocked-icon")).toBeInTheDocument();
    });
});
