import React from "react";
import {RdsCheckboxGroup} from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsCheckboxGroup
            state="Checkbox"
            isSwitch={false}
            isInline={false}
            label="Checkbox Group"
            itemList={[
                {
                    id: 1,
                    label: "Child Checkbox 1",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 2,
                    label: "Child Checkbox 2",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 3,
                    label: "Child Checkbox 3",
                    checked: false,
                    disabled: false,
                },
            ]}
            errorMessage="Error Message"
        />
    );
};

export default code_actual;
