import React from "react";
import RdsCompNewClaimType from "../../rds-comp-new-claim-type/rds-comp-new-claim-type";

export const code_actual = () => {
    return (
        <RdsCompNewClaimType
            claimsData={{
                name: "",
                required: false,
                isStatic: false,
                regex: "",
                regexDescription: "",
                description: "",
                valueType: "",
                valueTypeAsString: "",
            }}
            valueType={[
                { option: "String", value: 0 },
                { option: "Int", value: 1 },
                { option: "Boolean", value: 2 },
                { option: "DateTime", value: 3 },
            ]}
            onSubmit={() => {}}
        ></RdsCompNewClaimType>
    );
};

export default code_actual;
