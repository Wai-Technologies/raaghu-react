import React from "react";
import { RdsCollapse } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsCollapse
            buttonList={
                [
                    {
                        "colorVariant": "primary",
                        "label": "Toggle Element",
                        "id": "collapseExample"
                    }
                ]}
        />
    );
};

export default code_actual;
