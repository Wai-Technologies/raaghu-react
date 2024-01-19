import React from "react";
import RdsCompPersonalInfo from "../../rds-comp-personal-info/rds-comp-personal-info";

export const code_actual = () => {
    return (
        <RdsCompPersonalInfo
            handlePersonalDataSubmit={() => {}}
            handleVerifyEmailSubmit={() => {}}
            personalInfo={{
                userName: "",
                name: "",
                surname: "",
                email: "",
                phoneNumber: "",
            }}
        />
    );
};

export default code_actual;
