import React from "react";
import { RdsCheckbox } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsCheckbox
            state="Checkbox"
            label="default checkbox"
            checked={false}
            isDisabled={false}
            isSwitch={false}
            withlabel={true}
            id="checkboxId"
            errorMessage="error Message"
        />
    );
};

export default code_actual;
