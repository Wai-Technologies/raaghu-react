import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RdsOffcanvas } from "../src";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../src/rds-offcanvas/rds-offcanvas";
jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsOffcanvas", () => {
    it("renders without crashing", () => {
        const { getByText } = render(<RdsOffcanvas placement={RdsOffcanvasPlacement.End} offId="offcanvas-1" canvasTitle="My Offcanvas" backDrop={RdsOffcanvasBackDrop.False} scrolling={false}>Hello World</RdsOffcanvas>);
        expect(getByText("Hello World")).toBeInTheDocument();
    });

    it("opens when the button is clicked", () => {
        const { getByText, getByTestId } = render(
            <>
                <RdsOffcanvas placement={RdsOffcanvasPlacement.End} offId="offcanvas-1" canvasTitle="My Offcanvas" backDrop={RdsOffcanvasBackDrop.False} scrolling={false}>
                    Hello World
                </RdsOffcanvas>
                <button data-testid="toggle-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-1">Toggle</button>
            </>
        );

        const toggleBtn = getByTestId("toggle-btn");
        fireEvent.click(toggleBtn);

        expect(getByText("Hello World")).toBeVisible();
    });

    it("calls onClose callback when close button is clicked", () => {
        const handleClose = jest.fn();
        const { getByLabelText } = render(<RdsOffcanvas placement={RdsOffcanvasPlacement.End} offId="offcanvas-1" canvasTitle="My Offcanvas" onClose={handleClose} backDrop={RdsOffcanvasBackDrop.False} scrolling={false}>Hello World</RdsOffcanvas>);
    });
});
