import React from "react";
import { RdsTextArea } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsTextArea
            rows={3}
            readonly={false}
            label="Example label"
            placeholder="This is text area..."
            labelPosition="top"
            isDisabled={false}
            isRequired={false}
        />
    );
};

export default code_actual;
