import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RdsCompAppDetail, { RdsCompAppDetailProps } from "../src/rds-comp-app-detail/rds-comp-app-detail";
import RdsAppDetail, { RdsAppDetailProps } from "../../raaghu-elements/src/rds-app-detail/rds-app-detail";

const appDetailList = [
    {
        icon: "mock-icon",
        iconColor: "mock-color",
        iconHeight: 24,
        iconWidth: 24,
        iconFill: "mock-fill",
        iconStroke: "mock-stroke",
        title: "Mock Title",
        subtitle: "Mock Subtitle",
        route: "mock-route",
        routeLabel: "Mock Route Label",
    },
];

describe("RdsCompAppDetail", () => {
    test("renders the app details correctly", () => {
        const props: RdsCompAppDetailProps = {
            appDetailList: appDetailList,
        };

        const { getAllByText, getByText } = render(<RdsCompAppDetail {...props} />);

        // Assert that the app details are rendered
        const titleElement = getAllByText(/Mock Title/);
        expect(titleElement.length).toBe(appDetailList.length);

        const subtitleElement = getAllByText(/Mock Subtitle/);
        expect(subtitleElement.length).toBe(appDetailList.length);

        const routeLabelElement = getByText(/Mock Route Label/);
        expect(routeLabelElement).toBeInTheDocument();
    });

    test("renders the app detail component correctly", () => {
        const props: RdsAppDetailProps = {
            appDetailsItem: appDetailList[0],
        };

        const { getByText } = render(<RdsAppDetail {...props} />);

        // Assert that the app detail component is rendered
        const titleElement = getByText(/Mock Title/);
        expect(titleElement).toBeInTheDocument();

        const subtitleElement = getByText(/Mock Subtitle/);
        expect(subtitleElement).toBeInTheDocument();
    });
});
describe("Example Test Suite", () => {
    test("should pass this dummy test", () => {
        expect(true).toBe(true);
    });
});


