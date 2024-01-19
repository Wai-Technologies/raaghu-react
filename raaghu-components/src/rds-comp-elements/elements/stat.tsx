import React from "react";
import { RdsStat } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsStat
            displayType="basic"
            colorVariant="primary"
            items={[
                {
                    title: "SAM SMITH",
                    value: "2370",
                    icon: "star",
                    iconHeight: "80px",
                    iconWidth: "80px",
                    iconFill: true,
                },
            ]}
        />
    );
};

export default code_actual;
