import React from "react";
import { RdsInputGroup } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsInputGroup
            buttonLabel="BUTTON"
            colorVariant="primary"
            placeholder="Placeholder text"
            size="large"
            outline={true}
            inputValue={() => {}}
            inputGroupLabel="Field Label"
        />
    );
};

export default code_actual;
