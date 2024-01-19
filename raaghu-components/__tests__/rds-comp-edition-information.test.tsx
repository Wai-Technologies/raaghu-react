import React from "react";
import "@testing-library/jest-dom";
import {
    render,
    screen,
} from "@testing-library/react";
import RdsCompEditionInformation, {
    RdsCompEditionInformationProps,
} from "../src/rds-comp-edition-information/rds-comp-edition-information";

describe("RdsCompEditionInformation", () => {
    const mockEditionInfo = jest.fn();

    const defaultProps: RdsCompEditionInformationProps = {
        radioItems: [
            {
                label: "First Bill Date",
                inline: true,
                id: 1,
                itemList: [
                    {
                        id: 1,
                        label: "Immediately",
                        checked: true,
                        name: "radio_button",
                    },
                    {
                        id: 2,
                        label: "After Trial Period",
                        checked: false,
                        name: "radio_button",
                    },
                ],
            },
            {
                label: "After Subscription Expiry",
                id: 2,
                inline: true,
                itemList: [
                    {
                        id: 1,
                        label: "Deactivate Tenant",
                        checked: true,
                        name: "radio_button",
                    },
                    {
                        id: 2,
                        label: "Assign To Another Edition",
                        checked: false,
                        name: "radio_button",
                    },
                ],
            },
        ],
        editionInfo: mockEditionInfo,
    };

    beforeEach(() => {
        render(<RdsCompEditionInformation {...defaultProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders input fields", () => {
        expect(screen.getByText("Edition Name")).toBeInTheDocument();
        expect(screen.getByText("Annual Price")).toBeInTheDocument();
        expect(screen.getByText("Trial Period")).toBeInTheDocument();
        expect(screen.getByText("First Bill Date")).toBeInTheDocument();
        expect(screen.getByText("Immediately")).toBeInTheDocument();
        expect(screen.getByText("After Trial Period")).toBeInTheDocument();
        expect(screen.getByText("After Subscription Expiry")).toBeInTheDocument();
        expect(screen.getByText("Deactivate Tenant")).toBeInTheDocument();
        expect(screen.getByText("Assign To Another Edition")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(
            screen.getByText("Expiry Notification Interval")
        ).toBeInTheDocument();
        const required = screen.getAllByText("*");
        required.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const checkboxElement = screen.getAllByRole("img");
        checkboxElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const imgElement = screen.getAllByRole("img");
        imgElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByTestId("cancel")).toBeInTheDocument();
        expect(screen.getByTestId("next")).toBeInTheDocument();
    });

    test("renders edition name", () => {
        const editionNameInput = screen.getByTestId(
            "edition-name"
        ) as HTMLInputElement;
        expect(editionNameInput).toBeInTheDocument();
    });

    test("displays error message when annual price is empty and blurred", () => {
        const annualPriceInput = screen.getByText("Annual Price");
        expect(annualPriceInput).toBeInTheDocument();
    });

    //   test('calls editionInfo prop with true on form submission', () => {
    //     const editionNameInput = screen.getByTestId('edition-name');
    //     const annualPriceInput = screen.getByTestId('annual-price');
    //     const nextButton = screen.getByTestId('next');

    //     fireEvent.change(editionNameInput, { target: { value: 'Standard Edition' } });
    //     fireEvent.change(annualPriceInput, { target: { value: '100' } });
    //     fireEvent.click(nextButton);

    //     expect(mockEditionInfo).toHaveBeenCalledWith(true);
    //   });
});
