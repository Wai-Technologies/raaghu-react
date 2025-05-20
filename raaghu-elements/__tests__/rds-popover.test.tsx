import React from "react";
import { RdsPopover } from "../src";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { PopoverState } from "../src/rds-popover/rds-popover";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsPopover", () => {
    it("should set the position of the popover based on the 'popoverPosition' prop", () => {
        const { getByText } = render(
            <RdsPopover state={PopoverState.LeftCentre} >Popover content</RdsPopover>
        );
        const popover = getByText("Popover content")?.parentElement;
        expect(popover?.classList.contains("popoverLeft")).toBe(true);
    });


    it("renders without crashing", () => {
        render(<RdsPopover state={PopoverState.TopCentre} >Test</RdsPopover>);
    });
});

