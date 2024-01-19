import React from "react";
import { RdsPrice } from "../../rds-elements";

export const code_actual = () => {
    return <RdsPrice mrp={100} currentPrice={90} withDiscount={true} />;
};

export default code_actual;
