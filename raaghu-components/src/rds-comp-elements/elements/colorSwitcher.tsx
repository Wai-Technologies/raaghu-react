import React from "react";
import { RdsColorSwitcher } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsColorSwitcher
            displayType='rounded'
            header= 'Color'
            defaultValue= {1}
            itemList={ [
                { id: 1, color: "#FFFFFF" },
                { id: 2, color: "#FDD2FF" },
                { id: 3, color: "#BFEAFF" },
            ]}
        />
    );
};

export default code_actual;
