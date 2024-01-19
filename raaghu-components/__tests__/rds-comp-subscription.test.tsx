import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompSubscription, { RdsCompSubscriptionProps } from "../src/rds-comp-subscription/rds-comp-subscription";

const mockSubscriptionData = [
    {
        name: "Basic",
        price: "$19.99",
        duration: "per month",
        icon: "basic",
        colorVariant: "primary",
        recommended: false,
        features: [
            { title: "1 User" },
            { title: "Unlimited projects" },
            { title: "10GB Storage" },
            { title: "Email Support" },
        ],
    },
    {
        name: "Pro",
        price: "$49.99",
        duration: "per month",
        icon: "pro",
        colorVariant: "secondary",
        recommended: true,
        features: [
            { title: "5 Users" },
            { title: "Unlimited projects" },
            { title: "50GB Storage" },
            { title: "Priority Email Support" },
        ],
    },
];

describe("RdsCompSubscription component", () => {
    const onSubscriptionMock = jest.fn();

    const defaultProps: RdsCompSubscriptionProps = {
        subscriptionData: mockSubscriptionData,
        onSubscription: onSubscriptionMock,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component with subscription data", () => {
        render(<RdsCompSubscription {...defaultProps} />);

        const subscriptionNames = mockSubscriptionData.map((subscription) => subscription.name);
        subscriptionNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
    });

    test("clicking the upgrade button calls the onSubscription callback with the correct arguments", () => {
        render(<RdsCompSubscription {...defaultProps} />);

        const upgradeButtons = screen.getAllByText("Upgrade");
        fireEvent.click(upgradeButtons[0]); // simulate clicking the first upgrade button

        expect(onSubscriptionMock).toHaveBeenCalledTimes(1);
        expect(onSubscriptionMock).toHaveBeenCalledWith(expect.anything(), mockSubscriptionData[0]);
    });
});
