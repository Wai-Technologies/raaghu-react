import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsPopularPage, { RdsPopularPageProps } from "../src/rds-popular-page/rds-popular-page";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsPopularPage", () => {
    const itemList: RdsPopularPageProps["itemList"] = [
        {
            title: "Page 1",
            subtitle: "Description of page 1",
            icon: "users",
            route: "/page1"
        },
        {
            title: "Page 2",
            subtitle: "Description of page 2",
            icon: "folder",
            route: "/page2"
        }
    ];

    it("should render the list of popular pages", () => {
        render(<RdsPopularPage itemList={itemList} />);

        expect(screen.getByText("POPULAR PAGES")).toBeInTheDocument();
        expect(screen.getAllByTestId("container-div")).toHaveLength(2);
    });

    it("should render the correct information for each item", () => {
        render(<RdsPopularPage itemList={itemList} />);

        expect(screen.getByText("Page 1")).toBeInTheDocument();
        expect(screen.getByText("Description of page 1")).toBeInTheDocument();
        expect(screen.getByText("Page 2")).toBeInTheDocument();
        expect(screen.getByText("Description of page 2")).toBeInTheDocument();
    });

    it("should render the icons correctly", () => {
        render(<RdsPopularPage itemList={itemList} />);

        const iconElements = screen.getAllByRole("img");
        iconElements.forEach(item => {
            expect(item).toBeInTheDocument();
        });
    });
});
