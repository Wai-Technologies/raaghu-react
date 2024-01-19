import React from "react";
import { RdsSelectList } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsSelectList
            label="Open select list"
            isMultiple={false}
            selectItems={[
                {
                    option: "One",
                },
                {
                    option: "two",
                },
                {
                    option: "three",
                },
                {
                    option: "four",
                },
            ]}
            isDisabled={false}
        />
    );
};

export default code_actual;
