
import "@testing-library/jest-dom";
import RdsIconLabel from "../src/rds-icon-label/rds-icon-label";
import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

test("should render the label", () => {
    render(<RdsIconLabel label="Icon Label" icon='user' size='medium' fill={false} iconposition={"right"} />);
    const rdsIconLabelElement = screen.getByText("Icon Label");
    expect(rdsIconLabelElement).toBeInTheDocument();
});

test("should render the icon", () => {
    render(<RdsIconLabel label="Icon Label" icon='user' size='medium' fill={false} iconposition={"right"} />);
    const rdsIconElement = screen.getByRole("img");
    expect(rdsIconElement).toBeInTheDocument();
});