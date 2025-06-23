import React from "react";
import { render, screen } from "@testing-library/react";
import RdsCompAppDetail from "../src/rds-comp-app-detail/rds-comp-app-detail";
import "@testing-library/jest-dom";

// Mock RdsAppDetail component
jest.mock("../src/rds-elements", () => ({
    RdsAppDetail: jest.fn(({ appDetailsItem }) => (
        <div data-testid="mock-app-detail">
            <div>{appDetailsItem.title}</div>
            <div>{appDetailsItem.subtitle}</div>
        </div>
    )),
}));

describe("RdsCompAppDetail", () => {
    // Clear mock data before each test
    beforeEach(() => {
        const { RdsAppDetail } = require("../src/rds-elements");
        RdsAppDetail.mockClear();
    });

    const mockAppDetail = {
        title: "Test App",
        subtitle: "Test Description",
        icon: "test_icon",
        route: "/test",
        iconHeight: "20px",
        iconWidth: "20px",
        iconFill: false,
        iconColor: "primary",
        iconStroke: true,
        routeLabel: "View Details",
    };

    it("renders correctly with app details list", () => {
        const appDetailList = [{
            ...mockAppDetail
        }];
        
        render(
            <RdsCompAppDetail
                appDetailList={appDetailList}
            />
        );

        // Verify title and subtitle render
        expect(screen.getByText(mockAppDetail.title)).toBeInTheDocument();
        expect(screen.getByText(mockAppDetail.subtitle)).toBeInTheDocument();
    });

    it("handles empty app detail list", () => {
        render(
            <RdsCompAppDetail appDetailList={[]} />
        );
        
        // Verify no app details are rendered when list is empty
        expect(screen.queryByTestId("mock-app-detail")).not.toBeInTheDocument();
    });

    it("renders multiple app details correctly", () => {
        const appDetailList = [
            {
                ...mockAppDetail,
                title: "App 1",
                subtitle: "Description 1"
            },
            {
                ...mockAppDetail,
                title: "App 2",
                subtitle: "Description 2"
            }
        ];
        
        render(
            <RdsCompAppDetail appDetailList={appDetailList} />
        );
        
        // Verify both apps are rendered
        expect(screen.getByText("App 1")).toBeInTheDocument();
        expect(screen.getByText("App 2")).toBeInTheDocument();
        expect(screen.getByText("Description 1")).toBeInTheDocument();
        expect(screen.getByText("Description 2")).toBeInTheDocument();

        // Verify RdsAppDetail was called twice with correct props
        const { RdsAppDetail } = require("../src/rds-elements");
        expect(RdsAppDetail).toHaveBeenCalledTimes(2);
        expect(RdsAppDetail).toHaveBeenNthCalledWith(1, { appDetailsItem: appDetailList[0] }, {});
        expect(RdsAppDetail).toHaveBeenNthCalledWith(2, { appDetailsItem: appDetailList[1] }, {});
    });

    it("handles app detail items with missing properties", () => {
        const incompleteDetail = {
            title: "Partial App",
            subtitle: "Some description"
        };
        
        render(
            <RdsCompAppDetail appDetailList={[incompleteDetail]} />
        );
        
        expect(screen.getByText("Partial App")).toBeInTheDocument();
        expect(screen.getByText("Some description")).toBeInTheDocument();
    });

    it("adds correct margin class to detail items", () => {
        const { container } = render(
            <RdsCompAppDetail appDetailList={[mockAppDetail]} />
        );

        const detailContainer = container.querySelector(".m-2");
        expect(detailContainer).toBeInTheDocument();
    });
});