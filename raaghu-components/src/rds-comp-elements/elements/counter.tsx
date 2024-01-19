import React from "react";
import { RdsCounter } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsCounter
            counterValue={0}
            min={0}
            max={50}
            width={125}
            colorVariant="primary"
            position="top"
            label="Counter"
        />
    );
};

export default code_actual;
