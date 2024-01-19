import React from "react";
import RdsCompUserBasics from "../../rds-comp-user-basics/rds-comp-user-basics";

export const code_actual = () => {
    return (
        <RdsCompUserBasics
            userData={{
                name: "",
                surname: "",
                email: "",
                phoneNumber: "",
                lockoutEnabled: true,
                isActive: true,
                userName: "",
                password: "",
            }}
            createUser={() => {}}
        />
    );
};

export default code_actual;
