import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompMenuDirectory, { RdsCompMenuDirectoryProps } from "../src/rds-comp-menus-directories/rds-comp-menus-directories";

describe("RdsCompMenuDirectory", () => {
    const mockItems = [
        {
            data: {
                id: "1",
                displayName: "Item 1",
            },
            children: [],
        },
        {
            data: {
                id: "2",
                displayName: "Item 2",
            },
            children: [
                {
                    data: {
                        id: "2-1",
                        displayName: "Items",
                    },
                    children: [],
                },
            ],
        },
    ];

    const mockProps: RdsCompMenuDirectoryProps = {
        items: mockItems,
        offId: "offcanvas",
        onCreateSubMenu: jest.fn(),
        onDeleteMenu: jest.fn(),
        onMenuEdit: jest.fn(),
    };

    beforeEach(() => {
        render(<RdsCompMenuDirectory {...mockProps} />);
    });

    it("renders the menu items", () => {
        const item1 = screen.getByText("Item 1");
        const item2 = screen.getByText("Item 2");
        // const subItem = screen.getByText(/Items/i);

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        // expect(subItem).toBeInTheDocument();
    });

    //   it('expands/collapses the menu items on click', () => {
    //     const chevronUpIcon = screen.getByTestId('chevron_up');
    //     const chevronDownIcon = screen.getByTestId('chevron_down');

    //     expect(chevronUpIcon).toBeInTheDocument();
    //     expect(chevronDownIcon).toBeInTheDocument();

    //     fireEvent.click(screen.getByText('Item 2'));
    //     expect(chevronUpIcon).toBeInTheDocument();
    //     expect(chevronDownIcon).not.toBeInTheDocument();

    //     fireEvent.click(screen.getByText('Item 2'));
    //     expect(chevronUpIcon).not.toBeInTheDocument();
    //     expect(chevronDownIcon).toBeInTheDocument();
    //   });

    //   it('calls the onCreateSubMenu prop on clicking the plus icon', () => {
    //     fireEvent.click(screen.getByTestId('plus-icon'));
    //     expect(mockProps.onCreateSubMenu).toHaveBeenCalledWith(mockItems[0].data);
    //   });

    //   it('calls the onMenuEdit prop on clicking the pencil icon', () => {
    //     fireEvent.click(screen.getByTestId('pencil'));
    //     expect(mockProps.onMenuEdit).toHaveBeenCalledWith(mockItems[0].data);
    //   });

//   it('calls the onDeleteMenu prop on clicking the delete icon', () => {
//     fireEvent.click(screen.getByTestId('delete'));
//     expect(mockProps.onDeleteMenu).toHaveBeenCalledWith(mockItems[0].data.id);
//   });
});
