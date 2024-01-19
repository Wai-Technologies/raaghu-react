import React from "react";
import RdsCompCardDetailList from "../../rds-comp-card-detail-list";

export const code_actual = () => {
    return (
        <RdsCompCardDetailList   cardDatas= {[
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
        ></RdsCompCardDetailList>
    );
};

export default code_actual;
