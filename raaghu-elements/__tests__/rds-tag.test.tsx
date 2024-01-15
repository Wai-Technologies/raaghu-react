import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsTag from "../src/rds-tag/rds-tag";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
describe("RdsTag component", () => {
    it("renders without errors", () => {
        render(<RdsTag tagType={"square"} role={"basic"} colorVariant={"primary"} />);
    });

    it("adds a tag when Enter key is pressed and input is not empty", () => {
        const { getByPlaceholderText, getByText } = render(<RdsTag tagType={"square"} role={"basic"} colorVariant={"primary"} />);

        const inputElement = getByPlaceholderText("+ Add Tag");
        fireEvent.keyUp(inputElement, { key: "Enter", target: { value: "Tag 1" } });

        expect(getByText("Tag 1")).toBeInTheDocument();
    });


});
