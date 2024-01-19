import React from "react";
import { RdsAddressDetail } from "../../rds-elements";


export const code_actual = () => {

    return (
        <RdsAddressDetail
            addressLine1="Address Line 1"
            addressLine2="Address Line 2"
            addressLine3="Address Line 3"
            cardborder={true}
            header="Address Header"
            withIcon={true} children={undefined}></RdsAddressDetail>
    );
};

export default code_actual;
