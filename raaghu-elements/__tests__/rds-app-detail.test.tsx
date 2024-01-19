import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsAppDetail, { RdsAppDetailProps } from "../src/rds-app-detail/rds-app-detail";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsAppDetail", () => {
    const appDetailsItem: RdsAppDetailProps["appDetailsItem"] = {
        icon: "zapier",
        iconColor: "warning",
        iconHeight: "30px",
        iconWidth: "30px",
        iconFill: true,
        iconStroke: true,
        title: "Zapier",
        subtitle: "Build custom automation and intefrations with app",
        route: "https://example.com",
        routeLabel: "View integration",
    };

    it("renders the component with the given props", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );
        expect(screen.getByText("Zapier")).toBeInTheDocument();
        expect(screen.getByText("Build custom automation and intefrations with app")).toBeInTheDocument();
        expect(screen.getByText("View integration")).toHaveAttribute(
            "href",
            "https://example.com"
        );
    });

    it("renders the component with the icon", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );
        const iconElement = screen.getByRole("img");
        expect(iconElement).toBeInTheDocument();
    });

    it("renders the component with checkbox", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
});
