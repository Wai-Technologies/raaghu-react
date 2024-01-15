import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompIconList from "../src/rds-comp-icon-list/rds-comp-icon-list";

describe("RdsCompIconList", () => {
    it("renders search input", () => {
        render(<RdsCompIconList />);
        const searchInput = screen.getByPlaceholderText("Search Icon");
        expect(searchInput).toBeInTheDocument();
    });

    it("updates search value on change", () => {
        render(<RdsCompIconList />);
        const searchInput = screen.getByPlaceholderText(
            "Search Icon"
        ) as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: "search term" } });
        expect(searchInput.value).toBe("search term");
    });

    it("renders icon list", () => {
        render(<RdsCompIconList />);
        const iconList = screen.getAllByTestId("icon-list");
        iconList.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });



    //   render(<RdsCompIconList />);

    //   // Find an icon
    //   const icon = screen.getByTestId("icon-name");

    //   // Trigger click event
    //   fireEvent.click(icon);

    //   // Expect clipboard API to be called with the icon name
    //   // expect(mockWriteText).toHaveBeenCalledWith(icon.textContent);
    // });
});



describe("RdsCompIconList", () => {
    test("renders search input", () => {
        render(<RdsCompIconList />);
        const searchInput = screen.getByPlaceholderText("Search Icon");
        expect(searchInput).toBeInTheDocument();
    });

    test("filters icon list based on search input", () => {
        render(<RdsCompIconList />);
        const searchInput = screen.getByPlaceholderText("Search Icon");

        fireEvent.change(searchInput, { target: { value: "searchKeyword" } });

    // Assert your expectations for the filtered icon list
    });


});




describe("RdsCompIconList", () => {
    it("renders without errors", () => {
        render(<RdsCompIconList />);
    // No errors occurred if the component rendered successfully
    });

    // it("updates search value and filters the icon list", () => {
    //   const { getByTestId, getAllByTestId } = render(<RdsCompIconList />);

    //   const searchInput = getByTestId("search");
    //   fireEvent.change(searchInput, { target: { value: "search query" } });

    //   const iconListItems = getAllByTestId("icon-list");
    //   expect(iconListItems.length).toBeGreaterThan(0);
    //   // Additional assertions based on your specific use case
    // });

    // it("copies an icon name to clipboard and updates identity state", () => {
    //   const { getByText } = render(<RdsCompIconList />);

    //   const iconCopyButton = getByText("Copy");
    //   fireEvent.click(iconCopyButton);

    //   // Additional assertions based on your specific use case
    // });
});
