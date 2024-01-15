import React from "react";
import { RdsProgressBar } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsProgressBar
            role="single"
            colorVariant="primary"
            striped = {false}
            progressWidth={40}
            animation={false}
            height={15}
            displayLevel={true}
            displayPercentage={true}
        />
    );
};

export default code_actual;
