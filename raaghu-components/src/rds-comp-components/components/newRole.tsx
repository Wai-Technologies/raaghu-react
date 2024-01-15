import React from "react";
import RdsCompNewRole from "../../rds-comp-new-role/rds-comp-new-role";

export const code_actual = () => {
    return (
        <RdsCompNewRole
            roleData={{
                displayName: "Role Name",
                isDefault: false,
            }}
        />
    );
};

export default code_actual;
