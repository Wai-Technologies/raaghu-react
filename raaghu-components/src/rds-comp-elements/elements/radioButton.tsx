import React from "react";
import { RdsRadioButton } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsRadioButton
            displayType="Default"
            label="Radio Button"
            itemList={[
                {
                    id: 1,
                    label: "Radio Button 1",
                    checked: false,
                    name: "radio_button",
                },
                {
                    id: 2,
                    label: "Radio Button 2",
                    checked: false,
                    name: "radio_button",
                },
                {
                    id: 3,
                    label: "Radio Button 3",
                    checked: true,
                    name: "radio_button",
                },
            ]}
        />
    );
};

export default code_actual;
