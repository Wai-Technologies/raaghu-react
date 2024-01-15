import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsBanner from "../src/rds-banner/rds-banner";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsBanner", () => {

    it("renders banner text", () => {
        render(<RdsBanner bannerText= "Test Banner" textAlign="center" iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByText("Test Banner")).toBeInTheDocument();
    });

    it("renders with the correct text alignment", () => {
        render(<RdsBanner bannerText= "Test Banner" textAlign="center" iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toHaveClass("justify-content-center");
    });

    it("renders with an icon", () => {
        render(<RdsBanner bannerText= "Test Banner" textAlign="center" iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toContainHTML("<svg class=\"fs-6 me-2\"");
    });

    it("renders with a custom icon color", () => {
        render(<RdsBanner bannerText= "Test Banner" textAlign="center" iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toContainHTML("<svg class=\"text-light\"");
    });
});
