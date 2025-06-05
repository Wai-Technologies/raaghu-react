import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsBadge, { RdsBadgeProps } from "../src/rds-badge/rds-badge";

// Mock RdsIcon to prevent any fetch issues
jest.mock("../src/rds-icon/rds-icon", () => {
  return function MockRdsIcon(props: any) {
    return <div data-testid="mocked-icon">{props.name}</div>;
  };
});

describe("RdsBadge", () => {
    const defaultProps: RdsBadgeProps = {
        label: "Badge",
        // The component only renders the label when a specific layout is provided
        layout: "Text_only" 
    };

    it("renders a badge with the given label when layout is Text_only", () => {
        render(<RdsBadge {...defaultProps} />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toBeInTheDocument();
    });

    it("renders a badge with the given label when layout is Icon+Text", () => {
        render(<RdsBadge label="Badge" layout="Icon+Text" iconName="user" />);
        const badge = screen.getByText("Badge");
        expect(badge).toBeInTheDocument();
        expect(screen.getByTestId("mocked-icon")).toBeInTheDocument();
    });

    test("should call onClose handler when close button is clicked", () => {
        const handleClick = jest.fn();
        render(<RdsBadge label="Badge" showClose={true} onClose={handleClick} layout="Text_only" />);
    
        const closeButton = screen.getByTestId("closeButton");
        fireEvent.click(closeButton);
  
        expect(handleClick).toHaveBeenCalledWith("Badge");
    });

    it("applies the size class to the badge when size prop is provided", () => {
        const size = "small";
        const { container } = render(<RdsBadge {...defaultProps} size={size} />);
        // Check if the container has the size class
        const badgeElement = container.querySelector(".badge");
        expect(badgeElement).toHaveClass(size);
    });

    it("applies the colorVariant class to the badge when colorVariant prop is provided", () => {
        const colorVariant = "success";
        const { container } = render(<RdsBadge {...defaultProps} colorVariant={colorVariant} />);
        const badgeElement = container.querySelector(".badge");
        expect(badgeElement).toHaveClass(`badge-${colorVariant}`);
    });

    it("applies pill class to the badge when shape is pill", () => {
        const { container } = render(<RdsBadge {...defaultProps} shape="pill" />);
        const badgeElement = container.querySelector(".badge");
        expect(badgeElement).toHaveClass("rounded-pill");
    });

    it("applies the position-absolute class to the badge when positioned prop is true", () => {
        const { container } = render(<RdsBadge {...defaultProps} positioned />);
        const badgeElement = container.querySelector(".badge");
        expect(badgeElement).toHaveClass("position-absolute");
    });

    it("renders with icon when iconName is provided and layout is Icon+Text", () => {
        render(<RdsBadge label="Badge" iconName="user" layout="Icon+Text" />);
        const icon = screen.getByTestId("mocked-icon");
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveTextContent("user");
    });
});
