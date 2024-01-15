import React from "react";
import RdsCompBilling from "../../rds-comp-billing/rds-comp-billing";

export const code_actual = () => {
    return (
        <RdsCompBilling
            subscriptionData={[
                {
                    name: "BASIC",
                    price: "$232",
                    duration: "2 Year",
                    colorVariant: "info",
                    icon: "basic_subscription",
                    recommended: false,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: false },
                        { title: "Test check feature count 2", isInclude: false },
                    ],
                },
                {
                    name: "STANDARD",
                    price: "$432",
                    duration: "2 Year",
                    colorVariant: "success",
                    icon: "standard_subscription",
                    recommended: false,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: true },
                        { title: "Test check feature count 2", isInclude: false },
                    ],
                },
                {
                    name: "PREMIUM",
                    price: "$532",
                    duration: "2 Year",
                    colorVariant: "primary",
                    icon: "premium_subscription",
                    recommended: true,
                    features: [
                        { title: "Maximum User Count", isInclude: true },
                        { title: "Test Check feature", isInclude: true },
                        { title: "Test check feature count 2", isInclude: true },
                    ],
                },
            ]}
            billingHeaders={[
                {
                    displayName: "Invoice",
                    key: "invoice",
                    datatype: "text",
                    sortable: true,
                },
                {
                    displayName: "Amount",
                    key: "amount",
                    datatype: "text",
                    sortable: true,
                },
                {
                    displayName: "Date",
                    key: "expiry",
                    datatype: "text",
                    sortable: true,
                },
                {
                    displayName: "Status",
                    key: "status",
                    datatype: "badge",
                    sortable: true,
                },
            ]}
            billingData={[
                {
                    id: 1,
                    invoice: "Standard Plan -jan 2022",
                    amount: "USD $250.00",
                    expiry: " Jan 23, 2022",
                    status: { badgeColorVariant: "success", content: "Paid" },
                },
                {
                    id: 2,
                    invoice: "Standard Plan -dec 2021",
                    amount: "USD $300.00",
                    expiry: " Dec 23, 2021",
                    status: { badgeColorVariant: "success", content: "Paid" },
                },
            ]}
            actions={[{ id: "Download", displayName: "Download" }]}
            onActionSelection={() => {}}
        />
    );
};

export default code_actual;
