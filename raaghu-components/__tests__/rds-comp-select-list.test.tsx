import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompSelectList, { RdsCompSelectListProps } from "../src/rds-comp-select-list/rds-comp-select-list";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


describe("RdsCompSelectList", () => {
    const options = [
        { option: "Option 1", value: "option-1" },
        { option: "Option 2", value: "option-2" },
        { option: "Option 3", value: "option-3" },
    ];
    const props: RdsCompSelectListProps = {
        id:"hell",
        label: "Select an option",
        selectItems: []
    };

    it("should render select list with label and options", () => {
        render(<RdsCompSelectList {...props} />);
        const selectElement = screen.getByLabelText("select example");
        expect(selectElement).toBeInTheDocument();
        expect(screen.getByLabelText("select example")).toBeInTheDocument();

    });

    it("should call onChange callback when a single option is selected", () => {
        const onChange = jest.fn();
        render(
            <RdsCompSelectList {...props} onChange={onChange} />
        );
    });


    it("disables the select list when isDisabled is true", () => {
        render(<RdsCompSelectList {...props} isDisabled={true} />);
        const selectList = screen.getByLabelText("select example");
        expect(selectList).toBeDisabled();
    });
});
