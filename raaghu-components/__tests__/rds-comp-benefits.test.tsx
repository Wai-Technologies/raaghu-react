import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {RdsCompBenefits} from "../src";
import { RdsCompBenefitsProps } from "../src/rds-comp-benefits/rds-comp-benefits";

// Mock RdsCompIcon to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, colorVariant, height, width }) => (
        <img 
            src="test-icon.svg" 
            alt={name} 
            data-testid={`icon-${name}`} 
            role="img"
        />
    ))
}));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsCompBenefits", () => {
    const item = {
        icon: "currency_dollar_circle",
        iconHeight: "35px",
        iconWidth: "35px",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        imgSrc: "some-img-url",
        imgHeight: "100px",
        imgWidth: "100px",
        title: "Some Title",
        description: "Some Description",
        status: "some status"
    };
    const defaultProps: RdsCompBenefitsProps = {
        item: item,
        displayType: "default"
    };    it("renders the component with default display type", () => {
        render(<RdsCompBenefits item={item} displayType='default'/>);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });    it("renders the component with left aligned display type", () => {
        render(<RdsCompBenefits item={item} displayType="Left Aligned" />);
        const leftAlignedItem = screen.getByTestId("leftAligned");
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        expect(leftAlignedItem).toHaveClass("text-left");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });    it("renders the component with center aligned display type", () => {
        render(<RdsCompBenefits item={item} displayType="Center Aligned" />);
        const centerAlignedItem = screen.getByTestId("centerAligned");
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        expect(centerAlignedItem).toHaveClass("text-center");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });    it("renders the component with with label display type", () => {
        render(<RdsCompBenefits {...defaultProps} displayType="With Label" />);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        const badge = screen.getByText(item.status);
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(badge).toBeInTheDocument();
    });    it("renders the component with without label display type", () => {
        render(<RdsCompBenefits {...defaultProps} displayType="Without Label" />);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });    it("renders the component with heading with icon display type", () => {
        render(<RdsCompBenefits {...defaultProps} displayType="Heading With Icon" />);
        const title = screen.getByText(item.title);
        const icon = screen.getByTestId(`icon-${item.icon}`);
        expect(title).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });
});
