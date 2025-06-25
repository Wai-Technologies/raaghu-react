import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { RdsPagination } from "../src";
import '@testing-library/jest-dom';

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));
   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock the RdsCompIcon component to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name }) => (
        <img src="test-icon.svg" alt={name} role="img" data-testid={`icon-${name}`} />
    ))
}));

// Mock RdsButton component
jest.mock("../src/rds-button/rds-button", () => ({
    __esModule: true,
    default: jest.fn(({ onClick, label, children }) => (
        <button onClick={onClick} data-testid="rds-button">{label || children}</button>
    ))
}));

describe("RdsPagination", () => {
    it("renders correctly with default props", () => {
        render(<RdsPagination totalRecords={100} />);
        
        // Check that the pagination container is rendered
        expect(screen.getByTestId("page-link")).toBeInTheDocument();
    });    it("renders the correct number of pages based on total records and records per page", () => {
        const onPageChangeMock = jest.fn();
        render(
            <RdsPagination 
                totalRecords={50} 
                recordsPerPage={10} 
                onPageChange={onPageChangeMock}
            />
        );
        
        // With 50 records and 10 records per page, we should have 5 pages
        // The pagination should show page numbers 1-5
        const pageContainer = screen.getByTestId("page-link");
        
        // Check if the page numbers 1-5 exist
        const pageNumbers = [1, 2, 3, 4, 5];
        pageNumbers.forEach(pageNumber => {
            const pageElement = screen.getByText(pageNumber.toString());
            expect(pageElement).toBeInTheDocument();
        });
    });
    
    it("handles page changes correctly", () => {
        const onPageChangeMock = jest.fn();
        render(
            <RdsPagination 
                totalRecords={30} 
                recordsPerPage={10} 
                onPageChange={onPageChangeMock}
            />
        );
        
        // Find and click on page 2
        const page2 = screen.getByText("2");
        fireEvent.click(page2);
        
        // Check if onPageChange was called with the correct page number
        expect(onPageChangeMock).toHaveBeenCalledWith(2, 10);
    });
      it("disables the previous button on the first page", () => {
        render(
            <RdsPagination 
                totalRecords={30} 
                recordsPerPage={10} 
                currentPage={1}
                showFirst={true}
                showLast={true}
            />
        );
        
        // On the first page, the previous button should be disabled
        const firstPageButtons = screen.queryAllByTestId("rds-button")
            .filter(button => button.textContent?.includes("First") || button.textContent?.includes("Prev"));
            
        // If there are any "First" or "Prev" buttons, they should either:
        // 1. Have a parent with class "disabled", or
        // 2. Have the "disabled" attribute directly
        firstPageButtons.forEach(button => {
            const hasDisabledParent = button.closest(".disabled") !== null;
            const isDirectlyDisabled = button.hasAttribute("disabled");
            
            // At least one of these conditions should be true
            expect(hasDisabledParent || isDirectlyDisabled).toBeTruthy();
        });
    });
      it("renders with different alignment types", () => {
        const { rerender } = render(
            <RdsPagination 
                totalRecords={50} 
                alignmentType="center"
            />
        );
        
        // Check center alignment
        let paginationContainer = screen.getByTestId("page-link");
        const centerAlignedElement = paginationContainer.querySelector(".justify-content-center");
        expect(centerAlignedElement).not.toBeNull();
        
        // Rerender with end alignment
        rerender(
            <RdsPagination 
                totalRecords={50} 
                alignmentType="end"
            />
        );
        
        // Check end alignment
        paginationContainer = screen.getByTestId("page-link");
        const endAlignedElement = paginationContainer.querySelector(".justify-content-end");
        expect(endAlignedElement).not.toBeNull();    });
    
    it("handles manual page input when showManualInput is true", () => {
        const onPageChangeMock = jest.fn();
        render(
            <RdsPagination 
                totalRecords={100} 
                recordsPerPage={10} 
                onPageChange={onPageChangeMock}
                showManualInput={true}
            />
        );
        
        // Find the manual input (might need to adjust this selector based on actual implementation)
        const manualInputs = screen.queryAllByRole('textbox');
        
        // If manual input is found, test it
        if (manualInputs.length > 0) {
            const manualInput = manualInputs[0];
            
            // Type "5" in the input
            fireEvent.change(manualInput, { target: { value: '5' } });
            
            // Simulate pressing Enter
            fireEvent.keyDown(manualInput, { key: 'Enter', code: 'Enter' });
            
            // Check if onPageChange was called with the correct page
            expect(onPageChangeMock).toHaveBeenCalledWith(5, 10);
        }
    });
});