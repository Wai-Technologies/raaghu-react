import React from "react";
import { RdsInput } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsInput
            size="medium"
            inputType="text"
            placeholder="Add Placeholder"
            label="Label"
            labelPosition="top"
            id=""
            value=""
            required={true}
        />
    );
};

export default code_actual;
