import React from "react";
import { render } from "@testing-library/react";
import { RdsListGroup } from "../src";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


const listItem = [
    {
        label: "Home",
        disabled: false,
        badgeLabel: "10",
    },
    {
        label: "About Us",
        disabled: false,
        badgeLabel: "5",
    },
    {
        label: "Contact Us",
        disabled: true,
        badgeLabel: "2",
    },
];





describe("RdsListGroup component", () => {


    it("renders correctly with multi-select option", () => {
        const { getByLabelText } = render(<RdsListGroup listItem={listItem} listGroupWithMultiSelect />);

        // Check that the checkboxes are rendered
        expect(getByLabelText("Home")).toBeTruthy();
        expect(getByLabelText("About Us")).toBeTruthy();
        expect(getByLabelText("Contact Us")).toBeTruthy();
    });

    it("renders correctly with top label position", () => {
        const { getByText } = render(<RdsListGroup listItem={listItem} label="List Items" labelPosition="top" />);

        // Check that the label is rendered at the top
        expect(getByText("List Items")).toBeTruthy();
    });

    it("renders correctly with bottom label position", () => {
        const { getByText } = render(<RdsListGroup listItem={listItem} label="List Items" labelPosition="bottom" />);

        // Check that the label is rendered at the bottom
        expect(getByText("List Items")).toBeTruthy();
    });

    it("renders correctly without badges", () => {
        const { queryByTestId } = render(<RdsListGroup listItem={listItem} withBadge={false} />);

        // Check that the badges are not rendered
        expect(queryByTestId("badge-10")).toBeFalsy();
        expect(queryByTestId("badge-5")).toBeFalsy();
        expect(queryByTestId("badge-2")).toBeFalsy();
    });
});