import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsNavbar, { RdsNavbarProps } from "../src/rds-navbar/rds-navbar";

describe("RdsNavbar component", () => {
    const mockProps: RdsNavbarProps = {
        size: "large",
        navbarItems: [
            {
                label: "Home",
                href: "/home",
                navclass: "nav-home"
            },
            {
                label: "About",
                href: "/about",
                navclass: "nav-about"
            }
        ],
        title: "My App"
    };

    it("renders the navbar with the correct props", () => {
        const { getByText, getByRole } = render(<RdsNavbar {...mockProps} />);
        // Check for the navbar toggler button
        const navbarToggler = getByRole('button');
        expect(navbarToggler).toBeInTheDocument();
        // Check for the title
        const title = getByText(mockProps.title!);
        expect(title).toBeInTheDocument();
        // Check for navbar items
        mockProps.navbarItems.forEach((item) => {
            const link = getByText(item.label);
            expect(link).toHaveAttribute("href", item.href);
            expect(link).toHaveClass(item.navclass);
        });
    });

    it("renders a small navbar when size prop is set to 'small'", () => {
        const smallProps: RdsNavbarProps = {
            ...mockProps,
            size: "small"
        };
        const { container } = render(<RdsNavbar {...smallProps} />);
        // Find the container-fluid div and check for py-1 (actual class rendered)
        const containerFluid = container.querySelector('.container-fluid');
        expect(containerFluid).toHaveClass("py-1");
    });

    it("renders a large navbar when size prop is set to 'large'", () => {
        const { container } = render(<RdsNavbar {...mockProps} />);
        // Find the container-fluid div and check for py-3
        const containerFluid = container.querySelector('.container-fluid');
        expect(containerFluid).toHaveClass("py-3");
    });
});
