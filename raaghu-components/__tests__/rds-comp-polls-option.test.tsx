import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompPollsOption from "../src/rds-comp-polls-option/rds-comp-polls-option";
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompPollsOption", () => {
    const mockOptionsData = [
        { id: 1, text: "Option 1", order: 1, voteCount: 0 },
        { id: 2, text: "Option 2", order: 2, voteCount: 0 },
    ];

    const mockGetPollsOptionData = jest.fn(); // Mock function

    it("should render the component", () => {
        render(<RdsCompPollsOption optionsData={mockOptionsData} getPollsOptionData={mockGetPollsOptionData}/>);
    
        // Assert the presence of input, button, and table elements
        expect(screen.getByText("CmsKit.Options")).toBeInTheDocument();
    });

    it("should add a new option", () => {
        render(<RdsCompPollsOption optionsData={mockOptionsData} getPollsOptionData={mockGetPollsOptionData}/>);
    
        const optionInput = screen.getByTestId("option");
        const addButton = screen.getByTestId("add");

        fireEvent.change(optionInput, { target: { value: "New Option" } });
        fireEvent.click(addButton);

        // Assert that the new option is added to the table
        expect(screen.getByText("New Option")).toBeInTheDocument();
    });

    it("should render icons", ()=>{
        render(<RdsCompPollsOption optionsData={mockOptionsData} getPollsOptionData={mockGetPollsOptionData}/>);
        const iconElement = screen.getAllByRole("img");
        iconElement.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
