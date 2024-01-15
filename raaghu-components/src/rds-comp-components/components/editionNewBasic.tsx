import React from "react";
import RdsCompEditionNewBasic from "../../rds-comp-edition-new-basic/rds-comp-edition-new-basic";

export const code_actual = () => {
    return (
        <RdsCompEditionNewBasic
            planList={[
                {
                    isFree: true,
                    value: "standard",
                    option: "Standard",
                    isSelected: false,
                },
                {
                    isFree: false,
                    value: "advanced",
                    option: "Advanced",
                    isSelected: false,
                },
            ]}
        />
    );
};

export default code_actual;
