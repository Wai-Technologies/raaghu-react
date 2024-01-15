import React from "react";
import { render, screen } from "@testing-library/react";
import RdsBenefit, { RdsBenefitProps } from "../src/rds-benefit/rds-benefit";
import "@testing-library/jest-dom";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsBenefit", () => {
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
    const defaultProps: RdsBenefitProps = {
        item: item,
        displayType: "default"
    };

    it("renders the component with default display type", () => {
        render(<RdsBenefit item={item} displayType='default'/>);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByRole("img");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });

    it("renders the component with left aligned display type", () => {
        render(<RdsBenefit item={item} displayType="Left Aligned" />);
        const leftAlignedItem = screen.getByTestId("leftAligned");
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const img = screen.getByRole("img");
        expect(leftAlignedItem).toHaveClass("text-left");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(img).toBeInTheDocument();
    });

    it("renders the component with center aligned display type", () => {
        render(<RdsBenefit item={item} displayType="Center Aligned" />);
        const centerAlignedItem = screen.getByTestId("centerAligned");
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByRole("img");
        expect(centerAlignedItem).toHaveClass("text-center");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });

    it("renders the component with with label display type", () => {
        render(<RdsBenefit {...defaultProps} displayType="With Label" />);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const img = screen.getByRole("img");
        const badge = screen.getByText(item.status);
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(img).toBeInTheDocument();
        expect(badge).toBeInTheDocument();
    });

    it("renders the component with without label display type", () => {
        render(<RdsBenefit {...defaultProps} displayType="Without Label" />);
        const title = screen.getByText(item.title);
        const description = screen.getByText(item.description);
        const icon = screen.getByRole("img");
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });

    it("renders the component with heading with icon display type", () => {
        render(<RdsBenefit {...defaultProps} displayType="Heading With Icon" />);
        const title = screen.getByText(item.title);
        const icon = screen.getByRole("img");
        expect(title).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });
});
