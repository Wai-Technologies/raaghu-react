import React from "react";
import { RdsListGroup } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsListGroup
            labelPosition="top"
            label="List Group"
            listItem={[
                {
                    label: " label 1",
                    disabled: true,
                    badgeLabel: "10",
                    listHeading: "",
                    listContent: "",
                    listTime: "",
                    type: "",
                },
                {
                    label: " label 2",
                    disabled: false,
                    badgeLabel: "2",
                    listHeading: "",
                    listContent: "",
                    listTime: "",
                    type: "",
                },
                {
                    label: " label 3",
                    disabled: false,
                    badgeLabel: "5",
                    listHeading: "",
                    listContent: "",
                    listTime: "",
                    type: "",
                },
            ]}
        />
    );
};

export default code_actual;
