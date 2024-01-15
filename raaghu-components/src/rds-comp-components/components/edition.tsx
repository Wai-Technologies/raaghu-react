import React from "react";
import RdsCompEdition from "../../rds-comp-edition/rds-comp-edition";

export const code_actual = () => {
    return (
        <RdsCompEdition
            EditionItems={{
                EditionName: "Corporate",
                EditionTitle: "Strong Application for large team",
                Price: "45",
                Plan: "Per month",
            }}
            features={[
                "Maximum User Count",
                "Test Check feature",
                "Test check feature count 2",
            ]}
        />
    );
};

export default code_actual;
