import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsSearch from "../src/rds-search/rds-search";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
describe("RdsSearch component", () => {
    it("renders the component with placeholder and default props", () => {
        render(
            <RdsSearch placeholder="Search" size="medium" />
        );
        expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    it("triggers onChange event handler when user types in the input", () => {
        const onChange = jest.fn();
        render(
            <RdsSearch placeholder="Search" size="medium" onChange={onChange} />
        );
        const input = screen.getByPlaceholderText("Search")as HTMLInputElement;

        fireEvent.change(input, { target: { value: "hello" } });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe("hello");
    });

    it("triggers onKeyPress event handler when user types a key in the input", () => {
        const onKeyDown = jest.fn(()=>{console.log("Key Pressed");});
        render(
            <RdsSearch placeholder="Search" size="medium" onKeyPress={onKeyDown} />
        );
        const input = screen.getByPlaceholderText("Search");

        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it("renders search icon", ()=>{
        render(
            <RdsSearch
                placeholder="Search"
                size="medium"
            />
        );
        
           });


});
