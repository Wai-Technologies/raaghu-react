import React from "react";
import { RdsButtonGroup } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsButtonGroup
            isOutline={false}
            vertical={false}
            size="medium"
            colorVariant="primary"
            role="button"
            buttonGroupItems={[
                {
                    label: "Left",
                    id: "",
                    name: "",
                },
                {
                    label: "Middle",
                    id: "",
                    name: "",
                },
                {
                    label: "Right",
                    id: "",
                    name: "",
                },
            ]}
        />
    );
};

export default code_actual;
