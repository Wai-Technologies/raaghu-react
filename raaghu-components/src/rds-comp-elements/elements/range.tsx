import React from "react";
import { RdsRange } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsRange max={200} min={10} colorVariant="danger" rangeType="default" />
    );
};

export default code_actual;
