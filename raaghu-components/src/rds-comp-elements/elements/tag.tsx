import React from "react";
import { RdsTag } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsTag
            tagType="square"
            role="basic"
            colorVariant="primary"
            fillClose={false}
            tagArray={[
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ]}
        />
    );
};

export default code_actual;
