import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsSelectList, { RdsSelectProps } from "../src/rds-select-list/rds-select-list";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


describe("RdsSelectList", () => {
    const options = [
        { option: "Option 1", value: "option-1" },
        { option: "Option 2", value: "option-2" },
        { option: "Option 3", value: "option-3" },
    ];
    const props: RdsSelectProps = {
        id:"hell",
        label: "Select an option",
        selectItems: []
    };

    it("should render select list with label and options", () => {
        render(<RdsSelectList {...props} />);
        const selectElement = screen.getByLabelText("select example");
        expect(selectElement).toBeInTheDocument();
        expect(screen.getByLabelText("select example")).toBeInTheDocument();

    });

    it("should call onChange callback when a single option is selected", () => {
        const onChange = jest.fn();
        render(
            <RdsSelectList {...props} onChange={onChange} />
        );
    });


    it("disables the select list when isDisabled is true", () => {
        render(<RdsSelectList {...props} isDisabled={true} />);
        const selectList = screen.getByLabelText("select example");
        expect(selectList).toBeDisabled();
    });
});
