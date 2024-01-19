import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompDownloadCollation, { RdsCompDownloadCollationProps } from "../src/rds-comp-download-collation/rds-comp-download-collation";

describe("RdsCompDownloadCollation", () => {
    const mockDownloadTable = [
        { DateofData: "2023-01-01", NummberofDay: 1 },
        { DateofData: "2023-01-02", NummberofDay: 2 },
    ];

    const setup = (props: RdsCompDownloadCollationProps) => {
        return render(<RdsCompDownloadCollation {...props} />);
    };

    const defaultProps: RdsCompDownloadCollationProps = {
        downloadTable: [
            {
                DateofData: "2022-01-01",
                NummberofDay: "1 day ago",
            },
            {
                DateofData: "2022-01-02",
                NummberofDay: "2 days ago",
            },
        ],
    };
  
    it("should render download table with correct information and icons", () => {
        render(<RdsCompDownloadCollation {...defaultProps} />);
    
        // Check if download table rows are rendered
        expect(screen.getByText("2022-01-01")).toBeInTheDocument();
        expect(screen.getByText("1 day ago")).toBeInTheDocument();
        expect(screen.getByText("2022-01-02")).toBeInTheDocument();
        expect(screen.getByText("2 days ago")).toBeInTheDocument();
    
        // Check if icons are rendered
        const informationIcons = screen.getAllByRole("img");
        expect(informationIcons).toHaveLength(4);
    });

    it("renders download table items correctly", () => {
        setup({ downloadTable: mockDownloadTable });

        // Check if the date and number of days are rendered correctly for each item
        mockDownloadTable.forEach((item) => {
            const dateText = screen.getByText(item.DateofData);
            const daysText = screen.getByText(item.NummberofDay.toString());

            expect(dateText).toBeInTheDocument();
            expect(daysText).toBeInTheDocument();
        });
    });

    it("renders the correct number of download table items", () => {
        setup({ downloadTable: mockDownloadTable });

        const items = screen.getAllByRole("listitem");
        expect(items.length).toBe(mockDownloadTable.length);
    });

    it("renders RdsIcon components with correct props", () => {
        setup({ downloadTable: mockDownloadTable });

        const iconsElement = screen.getAllByRole("img");
        iconsElement.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
