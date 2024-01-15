import React from "react";
import RdsCompShippingAddress from "../../rds-comp-shipping-address/rds-comp-shipping-address";

export const code_actual = () => {
    return (
        <RdsCompShippingAddress
            countryList={[
                {
                    value: "1",
                    option: "India",
                    isSelected: false,
                },
                {
                    value: "2",
                    option: "China",
                    isSelected: false,
                },
                {
                    value: "3",
                    option: "Canada",
                    isSelected: false,
                },
                {
                    value: "4",
                    option: "Japan",
                    isSelected: false,
                },
                {
                    value: "5",
                    option: "Australia",
                    isSelected: false,
                },
                {
                    value: "6",
                    option: "USA",
                    isSelected: false,
                },
                {
                    value: "7",
                    option: "UK",
                    isSelected: false,
                },
            ]}
        />
    );
};

export default code_actual;
