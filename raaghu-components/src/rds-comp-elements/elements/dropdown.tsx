import React from "react";
import { RdsDropdown } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsDropdown
            colorVariant= "primary"
            id="dropdownlist"
            size="mid"
            darkDropdown={false}
            label="Dropdown Button"
            direction="Drop-Down"
            split={false}
            listItems={[
                {
                    label: "Export To Excel",
                    id: "1",
                    path: "",
                },
                {
                    label: "Import From Excel",
                    id: "2",
                    path: "",
                },
                {
                    label: "Click here download sample import file",
                    id: "3",
                    path: "",
                },
            ]}
        />
    );
};

export default code_actual;
