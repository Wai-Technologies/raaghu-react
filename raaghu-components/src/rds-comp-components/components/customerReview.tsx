import React from "react";
import RdsCompCustomerReviews from "../../rds-comp-customer-reviews/rds-comp-customer-reviews";

export const code_actual = () => {
    return (
        <RdsCompCustomerReviews
            itemList={[
                { value: 1, count: 1017 },
                { value: 2, count: 313 },
                { value: 3, count: 704 },
                { value: 4, count: 1722 },
                { value: 5, count: 4069 },
            ]}
        />
    );
};

export default code_actual;
