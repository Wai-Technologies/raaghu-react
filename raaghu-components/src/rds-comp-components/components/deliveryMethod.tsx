import React from "react";
import RdsCompDeliveryMethod from "../../rds-comp-delivery-method/rds-comp-delivery-method";

export const code_actual = () => {
    return (
        <RdsCompDeliveryMethod
            sizeDataWithDescription={[
                { id: 1, type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
                { id: 2, type: "Express", days: "2-5 buisness days", cost: "$16.00" },
                { id: 3, type: "Free", days: "10-12 buisness days", cost: "$0.00" },
            ]}
            sizeType="withDescription"
        />
    );
};

export default code_actual;
