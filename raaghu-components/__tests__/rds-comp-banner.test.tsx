import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompBanner, { TextAlign } from "../src/rds-comp-banner/rds-comp-banner";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsCompBanner", () => {

    it("renders banner text", () => {
        render(<RdsCompBanner bannerText= "Test Banner" textAlign={TextAlign.Center} iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByText("Test Banner")).toBeInTheDocument();
    });

    it("renders with the correct text alignment", () => {
        render(<RdsCompBanner bannerText= "Test Banner" textAlign={TextAlign.Center} iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toHaveClass("justify-content-center");
    });

    it("renders with an icon", () => {
        render(<RdsCompBanner bannerText= "Test Banner" textAlign={TextAlign.Center} iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toContainHTML("<svg class=\"fs-6 me-2\"");
    });

    it("renders with a custom icon color", () => {
        render(<RdsCompBanner bannerText= "Test Banner" textAlign={TextAlign.Center} iconHeight={"20px"} iconWidth={"20px"} iconStroke={true} iconFill={false} />);
        expect(screen.getByRole("alert")).toContainHTML("<svg class=\"text-light\"");
    });
});
