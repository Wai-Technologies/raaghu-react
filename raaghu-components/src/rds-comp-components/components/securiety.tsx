import React from "react";
import RdsCompSecurity from "../../rds-comp-security/rds-comp-security";

export const code_actual = () => {
    return (
        <RdsCompSecurity
            checkgroupList={[
                {
                    id: 1,
                    label: "Require Digit",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 2,
                    label: "Require Lowercase",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 3,
                    label: "Require Non-Alphanumeric",
                    checked: false,
                    disabled: false,
                },
                {
                    id: 4,
                    label: "Require Uppercase",
                    checked: false,
                    disabled: false,
                },
            ]}
        />
    );
};

export default code_actual;
