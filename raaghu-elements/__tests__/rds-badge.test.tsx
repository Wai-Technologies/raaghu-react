import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsBadge, { RdsBadgeProps } from "../src/rds-badge/rds-badge";

describe("RdsBadge", () => {
    const defaultProps: RdsBadgeProps = {
        label: "Badge",
    };

    it("renders a badge with the given label", () => {
        render(<RdsBadge {...defaultProps} />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toBeInTheDocument();
    });

    test("should call onClose handler when close button is clicked", () => {
        const handleClick = jest.fn();
        render(<RdsBadge label="Badge" showClose={true} onClose={handleClick} />);
    
        const closeButton = screen.getByTestId("closeButton");
        fireEvent.click(closeButton);
  
        expect(handleClick).toHaveBeenCalled();
    });

    // it("renders the children on the left side by default", () => {
    //   const childText = "Child";
    //   render(<RdsBadge label="Badge">{childText}</RdsBadge>);
    //   const badge = screen.getByText("Badge");
    //   const child = screen.getByText(childText);
    //   expect(badge).toContainElement(child);
    // });

    // it("renders the children on the right side when childrenSide prop is 'right'", () => {
    //   const childText = "Child";
    //   render(<RdsBadge {...defaultProps} childrenSide="right">{childText}</RdsBadge>);
    //   const badge = screen.getByText(defaultProps.label);
    //   const child = screen.getByText(childText);
    //   expect(badge).toContainElement(child);
    //   expect(child).toHaveClass("badge-icon-end");
    // });

    it("applies the size class to the badge when size prop is provided", () => {
        const size = "small";
        render(<RdsBadge {...defaultProps} size={size} />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toHaveClass(`${size}`);
    });

    it("applies the colorVariant class to the badge when colorVariant prop is provided", () => {
        const colorVariant = "success";
        render(<RdsBadge {...defaultProps} colorVariant={colorVariant} />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toHaveClass(`badge-${colorVariant}`);
    });

    it("applies the badgeType class to the badge when badgeType prop is provided", () => {
        const Shape = "rectangle";
        render(<RdsBadge {...defaultProps} shape="rectangle" />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toHaveClass("badge badge-undefined rounded rectangle");
    });

    it("applies the position-absolute and badge_icon classes to the badge when positioned prop is true", () => {
        render(<RdsBadge {...defaultProps} positioned />);
        const badge = screen.getByText(defaultProps.label);
        expect(badge).toHaveClass("badge badge-undefined position-absolute top-0 start-100 translate-middle");
    });
});
