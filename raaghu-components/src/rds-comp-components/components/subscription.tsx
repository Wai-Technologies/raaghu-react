import React from "react";
import RdsCompSubscription from "../../rds-comp-subscription/rds-comp-subscription";

export const code_actual = () => {
    return (
        <RdsCompSubscription
            width="226px"
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
        />
    );
};

export default code_actual;
