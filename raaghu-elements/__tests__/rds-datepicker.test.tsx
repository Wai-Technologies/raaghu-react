import { render, fireEvent, getByLabelText, getByPlaceholderText } from "@testing-library/react";
import React from "react";
import { RdsDatePicker } from "../src";
import RdsDatepicker from "../src/rds-datepicker";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

interface RdsDatepickerProps {
    onDatePicker?: (date: Date) => void;
    onRangeChange?: (startDate: Date, endDate: Date) => void; // add this line
    // other props here...
}
interface RdsDatepickerProps {
    /* existing properties */
    onCalendarChange?: (...args: any[]) => any;
}
describe("RdsDatepicker", () => {
    it("renders without crashing", () => {
        const onDatePicker = jest.fn();
        render(<RdsDatepicker onDatePicker={onDatePicker} isDropdownOpen={false} />);
    });
    it("allows selecting a date range", () => {
        const getByText = (content: string, element?: HTMLElement) => {
            const hasText = (node: any) => node.textContent === content;
            const nodeHasText = element ? hasText(element) : false;
            const childrenDontHaveText = Array.from(element?.children ?? []).every(
                (child) => !hasText(child)
            );
            return nodeHasText && childrenDontHaveText;
        };

    });


});
function getByText(arg0: (content: any, element: { children: any; }) => boolean) {
    throw new Error("Function not implemented.");
}

