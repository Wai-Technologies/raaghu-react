import React from "react";
import { RdsBankCardDetail } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBankCardDetail
            cardDatas={[
                {
                    iconHeight: "30px",
                    iconWidth: "30px",
                    icon: "editions",
                    iconFill: false,
                    iconstroke: true,
                    iconColorVarient: "dark",
                    cardID: "1011",
                    cardName: "MasterCard",
                    cardExpiry: "11/2027",
                    cardNumber: 3596,
                    isDefault: false,
                },
            ]}
        />
    );
};

export default code_actual;
