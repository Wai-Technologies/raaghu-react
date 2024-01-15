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
        const { getByText, getByLabelText } = render(<RdsNavbar {...mockProps} />);
        const navbar = getByLabelText("Toggle navigation");
        expect(navbar).toBeInTheDocument();
        const title = getByText(mockProps.title!);
        expect(title).toBeInTheDocument();
        const navbarItems = mockProps.navbarItems;
        navbarItems.forEach((item) => {
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
        expect(container.firstChild).toHaveClass("py-0");
    });

    it("renders a large navbar when size prop is set to 'large'", () => {
        const { container } = render(<RdsNavbar {...mockProps} />);
        expect(container.firstChild).toHaveClass("py-3");
    });
});
