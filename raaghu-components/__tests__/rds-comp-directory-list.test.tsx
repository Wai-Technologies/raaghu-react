import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompDirectoryList, { DirectoryItem, RdsCompDirectoryListProps } from "../src/rds-comp-directory-list/rds-comp-directory-list";

const mockItems: DirectoryItem[] = [
    {
        id: "1",
        name: "Directory 1",
        children: [
            {
                id: "2",
                name: "Subdirectory 1",
            },
            {
                id: "3",
                name: "Subdirectory 2",
            },
        ],
    },
    {
        id: "4",
        name: "Directory 2",
    },
];

const mockProps: RdsCompDirectoryListProps = {
    items: mockItems,
    path: jest.fn(),
    selectedItemId: "2",
    onDragAndDrop: jest.fn(),
};

describe("RdsCompDirectoryList", () => {
    it("renders the directory items", () => {
        render(<RdsCompDirectoryList {...mockProps} />);
    
        expect(screen.getByText("Directory 1")).toBeInTheDocument();
        expect(screen.getByText("Directory 2")).toBeInTheDocument();
        expect(screen.queryByText("Subdirectory 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Subdirectory 2")).not.toBeInTheDocument();
        const iconElement = screen.getAllByRole("img");
        iconElement.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });

    it("expands and collapses the directory items on click", () => {
        render(<RdsCompDirectoryList {...mockProps} />);
    
        expect(screen.queryByText("Subdirectory 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Subdirectory 2")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("collapse-icon"));
    
        expect(screen.getByText("Subdirectory 1")).toBeInTheDocument();
        expect(screen.getByText("Subdirectory 2")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("collapse-icon"));
    
        expect(screen.queryByText("Subdirectory 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Subdirectory 2")).not.toBeInTheDocument();
    });

    it("triggers the path callback when an item is clicked", () => {
        render(<RdsCompDirectoryList {...mockProps} />);
    
        fireEvent.click(screen.getByText("Directory 1"));
    
        expect(mockProps.path).toHaveBeenCalledWith({ id: "1", name: "Directory 1" });
    });
});


