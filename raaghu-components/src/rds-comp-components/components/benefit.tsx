import React from "react";
import RdsCompBenefit from "../../rds-comp-benefit/rds-comp-benefit";

export const code_actual = () => {
    return (
        <RdsCompBenefit
            displayType="default"
            colsize={4}
            itemList={[
                {
                    id: 1,
                    icon: "currency_dollar_circle",
                    iconHeight: "35px",
                    iconWidth: "35px",
                    iconFill: false,
                    iconstroke: true,
                    iconColorVarient: "dark",
                    title: "Royalty Rewards",
                    description: "Dont look at other tees",
                },
                {
                    id: 2,
                    icon: "roles",
                    iconHeight: "35px",
                    iconWidth: "35px",
                    title: "International delivery",
                    description: "Get your order in 2 years",
                    iconFill: false,
                    " iconstroke": true,
                    iconColorVarient: "dark",
                },
                {
                    id: 3,
                    iconHeight: "40px",
                    iconWidth: "40px",
                    icon: "truck",
                    iconFill: false,
                    iconstroke: true,
                    iconColorVarient: "dark",
                    title: "Free shipping",
                    description: "Free delivery is our main part of company.",
                },
            ]}
        />
    );
};

export default code_actual;
