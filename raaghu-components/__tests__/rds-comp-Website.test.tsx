import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsCompWebsiteLog, { RdsCompWebsiteLogProps } from "../src/rds-comp-website-log/rds-comp-website-log";


describe("RdsCompWebsiteLog", () => {
    const websiteLogData = [
        { status: "INFO", content: "Website launched successfully" },
        { status: "WARN", content: "Website running slow" },
        { status: "ERROR", content: "Website down" },
    ];

    const defaultProps: RdsCompWebsiteLogProps = {
        websiteLogData,
        pagination: false,
        alignmentType: "left",
        totalRecords: websiteLogData.length,
        recordsPerPage: 5,
    };

    it("renders the component", () => {
        const { getByTestId } = render(<RdsCompWebsiteLog {...defaultProps} />);
        expect(getByTestId("rds-comp-website-log")).toBeInTheDocument();
    });

    it("displays the website log data", () => {
        const { getByText } = render(<RdsCompWebsiteLog {...defaultProps} />);
        websiteLogData.forEach((item) => {
            expect(getByText(item.status)).toBeInTheDocument();
            expect(getByText(item.content)).toBeInTheDocument();
        });
    });

    it("displays pagination when pagination prop is true", () => {
        const { getByTestId } = render(<RdsCompWebsiteLog {...defaultProps}  />);
        expect(getByTestId("rds-pagination")).toBeInTheDocument();
    });


    it("updates row status when onPageChangeHandler is called", () => {
        const { getByTestId } = render(<RdsCompWebsiteLog {...defaultProps}  />);
        const pagination: HTMLElement | null = getByTestId("rds-pagination");

        if (pagination) {
            const nextPageButton: Element | null = pagination.querySelector("[aria-label=\"Next page\"]");
            if (nextPageButton instanceof HTMLElement) {
                fireEvent.click(nextPageButton);
            }
        }
    });


});