import React from "react";
import { RdsBenefit } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBenefit
            displayType="default"
            item={{
                id: 1,
                icon: "currency_dollar_circle",
                iconHeight: "35px",
                iconWidth: "35px",
                iconFill: false,
                iconstroke: true,
                iconColorVarient: "dark",
                title: "International delivery",
                description: "Get your order in 2 days",
            }}
        />
    );
};

export default code_actual;
