import React from "react";
import { RdsDoubleRange } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsDoubleRange
            max={200}
            min={10}
            doubleRangeType="default"
        />
    );
};

export default code_actual;
