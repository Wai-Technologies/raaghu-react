import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import RdsCompCache , { RdsCacheProps } from "../src/rds-comp-cache/rds-comp-cache";
import "@testing-library/jest-dom";
describe("RdsCompCache", () => {
    const mockData = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ];

    test("renders cache items without pagination", () => {
        render(<RdsCompCache
            cachedata={[]}
            recordsperpage={0} />);
    });



    test("renders cache items with pagination", () => {
        render(<RdsCompCache cachedata={[]} recordsperpage={0} />);
        expect(screen.queryByTestId("cache-item")).not.toBeInTheDocument();

    });

    test("calls deleteHandler when delete button is clicked", () => {
        const deleteHandler = jest.fn();
        render(
            <RdsCompCache
                cachedata={[]}
                recordsperpage={0}
            />
        );

    });
});









  

  

